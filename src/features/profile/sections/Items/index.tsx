import * as C from '@chakra-ui/react';
import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import React, { useContext, useState } from 'react';
import { noop } from '@chakra-ui/utils';
import AccountContext from '../../../../context/account';
import AddButton from '../../components/AddButton';
import CategoriesContext from '../../../../context/categories';
import DispatchContext from '../../../../context/dispatch';
import ItemsContext from '../../../../context/items';
import ListItem from './components/ListItem';
import ProfilesContext from '../../../../context/profiles';
import SortableListItem from './components/SortableListItem';
import generateId from '../../../../utilities/generate-id';
import selectActiveProfile from '../../../../selectors/select-active-profile';
import selectCategoryId from '../../../../selectors/select-category-id';
import useAutoResetState from '../../../../utilities/use-auto-reset-state';
import { Category, Id, Item } from '../../../../types';

const Items = () => {
  const account = useContext(AccountContext);
  const categories = useContext(CategoriesContext);
  const dispatch = useContext(DispatchContext);
  const items = useContext(ItemsContext);
  const profiles = useContext(ProfilesContext);
  const [draggingId, setDraggingId] = useState<Id>('');
  const [draggingOverCategoryId, setDraggingOverCategoryId] = useState<Id>('');
  const [focusAtPosition, setFocusAtPosition] = useAutoResetState<[Id, number]>(['', 0]);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<Record<Id, boolean>>({});
  const sensors = D.useSensors(D.useSensor(D.MouseSensor), D.useSensor(D.TouchSensor));
  if (!account.profiles.length) return null;
  const state = { account, categories, items, profiles };
  const activeProfile = selectActiveProfile({ account, profiles });
  const draggingIdCategoryId = selectCategoryId(state, { id: draggingId });
  const draggingItemOrCategory = items[draggingId] || categories[draggingId];
  const isDraggingCategory = draggingId === draggingIdCategoryId;

  return (
    <C.Box aria-label="items" as="section" layerStyle="bgCard" mt={12}>
      <D.DndContext
        collisionDetection={(args) => {
          if (args.active.id in categories) {
            return D.closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(({ id }) => id in categories),
            });
          }

          const overId = D.getFirstCollision(D.rectIntersection(args), 'id');
          if (!overId) return [];

          if (overId in categories && isCategoryExpanded[overId] && categories[overId].items.length) {
            return D.closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(({ id }) =>
                categories[overId].items.includes(String(id))
              ),
            });
          }

          return [{ id: overId }];
        }}
        id="items-dnd-context"
        onDragCancel={() => {
          setDraggingId('');
          setDraggingOverCategoryId('');
        }}
        onDragEnd={({ active, over }: D.DragEndEvent) => {
          setDraggingId('');
          setDraggingOverCategoryId('');

          if (!activeProfile || !over?.id) return;

          if (active.id in categories) {
            const activeCategoryIndex = activeProfile.categories.findIndex((id) => id === active.id);
            const overCategoryIndex = activeProfile.categories.findIndex((id) => id === over.id);

            if (activeCategoryIndex !== overCategoryIndex) {
              dispatch({
                fromIndex: activeCategoryIndex,
                toIndex: overCategoryIndex,
                type: 'ReorderCategory',
              });
            }

            return;
          }

          const fromCategoryId = selectCategoryId(state, { id: String(active.id) });
          const toCategoryId = selectCategoryId(state, { id: String(over.id) });

          if (fromCategoryId !== toCategoryId) {
            if (!isCategoryExpanded[toCategoryId] || categories[toCategoryId].items.length === 0) {
              dispatch({
                fromCategoryId,
                id: String(active.id),
                toCategoryId,
                toIndex: 0,
                type: 'MoveItem',
              });
            }

            return;
          }

          const itemIds = categories[fromCategoryId].items;
          const fromIndex = itemIds.indexOf(String(active.id));
          const toIndex = itemIds.indexOf(String(over.id));

          if (fromIndex === toIndex) return;

          dispatch({
            categoryId: fromCategoryId,
            fromIndex,
            toIndex,
            type: 'ReorderItem',
          });
        }}
        onDragOver={({ active, over }: D.DragOverEvent) => {
          if (active.id in categories || !over?.id) {
            setDraggingOverCategoryId('');
            return;
          }

          const fromCategoryId = selectCategoryId(state, { id: String(active.id) });
          const toCategoryId = selectCategoryId(state, { id: String(over.id) });
          setDraggingOverCategoryId(toCategoryId);

          if (
            fromCategoryId === toCategoryId ||
            !isCategoryExpanded[toCategoryId] ||
            !categories[toCategoryId].items.length
          ) {
            return;
          }

          const fromCategoryIndex = activeProfile.categories.indexOf(fromCategoryId);
          const toCategoryIndex = activeProfile.categories.indexOf(toCategoryId);
          const overItems = categories[toCategoryId].items;
          const overItemIndex = overItems.indexOf(String(over.id));

          const toIndex =
            overItemIndex || (overItems.length === 1 && fromCategoryIndex > toCategoryIndex) ? 0 : overItems.length;

          dispatch({
            fromCategoryId,
            id: String(active.id),
            toCategoryId,
            toIndex,
            type: 'MoveItem',
          });
        }}
        onDragStart={({ active }: D.DragStartEvent) => {
          setDraggingId(String(active.id));
          if (active.id in categories) return;
          setDraggingOverCategoryId(selectCategoryId(state, { id: String(active.id) }));
        }}
        sensors={sensors}
      >
        <DS.SortableContext items={activeProfile.categories} strategy={DS.verticalListSortingStrategy}>
          {activeProfile.categories.map((categoryId, categoryIndex) => {
            const category = categories[categoryId];
            let previous: Category | Item | undefined = categories[activeProfile.categories[categoryIndex - 1]];

            if (previous && isCategoryExpanded[previous.id] && (previous as Category).items.length) {
              previous = items[(previous as Category).items[(previous as Category).items.length - 1]];
            }

            return (
              <SortableListItem
                categoryId={categoryId}
                focusAtPosition={focusAtPosition[0] === categoryId ? focusAtPosition[1] : undefined}
                id={categoryId}
                index={categoryIndex}
                isCategory
                isCategoryExpanded={isCategoryExpanded[categoryId]}
                isDropzone={draggingOverCategoryId === categoryId}
                key={categoryId}
                previousId={previous?.id}
                previousIsCategory={!!(previous as Category)?.items}
                previousText={previous?.text}
                setFocusAtPosition={setFocusAtPosition}
                toggleExpandCategory={() =>
                  setIsCategoryExpanded((state) => ({ ...state, [categoryId]: !state[categoryId] }))
                }
                value={category.text}
              >
                <DS.SortableContext items={categories[categoryId].items} strategy={DS.verticalListSortingStrategy}>
                  {categories[categoryId].items.map((itemId, itemIndex) => {
                    previous = items[category.items[itemIndex - 1]] || category;

                    return (
                      <SortableListItem
                        categoryId={categoryId}
                        focusAtPosition={focusAtPosition[0] === itemId ? focusAtPosition[1] : undefined}
                        id={itemId}
                        index={itemIndex}
                        key={itemId}
                        previousId={previous.id}
                        previousIsCategory={!!(previous as Category).items}
                        previousText={previous.text}
                        setFocusAtPosition={setFocusAtPosition}
                        value={items[itemId].text}
                      />
                    );
                  })}
                </DS.SortableContext>
                <AddButton
                  onClick={() => {
                    const id = generateId();

                    dispatch({
                      atIndex: categories[categoryId].items.length,
                      categoryId,
                      id,
                      type: 'CreateItem',
                    });

                    setFocusAtPosition([id, 0]);
                  }}
                >
                  add item
                </AddButton>
              </SortableListItem>
            );
          })}
        </DS.SortableContext>
        <AddButton
          onClick={() => {
            const id = generateId();

            dispatch({
              atIndex: activeProfile.categories.length,
              id,
              type: 'CreateCategory',
            });

            setIsCategoryExpanded((state) => ({ ...state, [id]: true }));
            setFocusAtPosition([id, 0]);
          }}
        >
          add category
        </AddButton>
        <C.Portal>
          <D.DragOverlay dropAnimation={null}>
            {!!draggingId && (
              <ListItem
                categoryId={draggingIdCategoryId}
                id={draggingId}
                index={0}
                isCategory={isDraggingCategory}
                isCategoryExpanded={isCategoryExpanded[draggingId]}
                isOverlay
                setFocusAtPosition={noop}
                value={draggingItemOrCategory.text}
              >
                {isDraggingCategory ? (
                  <>
                    {categories[draggingId].items.map((itemId, index) => (
                      <ListItem
                        categoryId={draggingOverCategoryId}
                        id={itemId}
                        index={index}
                        key={`overlay-${itemId}`}
                        setFocusAtPosition={noop}
                        value={items[itemId].text}
                      />
                    ))}
                    <AddButton>add item</AddButton>
                  </>
                ) : null}
              </ListItem>
            )}
          </D.DragOverlay>
        </C.Portal>
      </D.DndContext>
    </C.Box>
  );
};

export default Items;
