import * as C from '@chakra-ui/react';
import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import React, { useContext, useState } from 'react';
import AccountContext from '../../../../context/account';
import AddButton from '../../components/AddButton';
import ApiContext from '../../../../context/api';
import CategoriesContext from '../../../../context/categories';
import ItemsContext from '../../../../context/items';
import ListItem from './components/ListItem';
import ProfilesContext from '../../../../context/profiles';
import SortableListItem from './components/SortableListItem';
import selectActiveProfile from '../../../../selectors/select-active-profile';
import selectCategoryId from '../../../../selectors/select-category-id';
import { Id } from '../../../../types';

const Items = () => {
  const { account } = useContext(AccountContext);
  const { categories } = useContext(CategoriesContext);
  const { dispatch } = useContext(ApiContext);
  const { items } = useContext(ItemsContext);
  const { profiles } = useContext(ProfilesContext);
  const [draggingId, setDraggingId] = useState<Id>('');
  const [draggingOverCategoryId, setDraggingOverCategoryId] = useState<Id>('');
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<Record<Id, boolean>>({});
  const sensors = D.useSensors(D.useSensor(D.MouseSensor), D.useSensor(D.TouchSensor));
  if (!account.profiles.length) return null;
  const state = { account, categories, items, profiles };
  const activeProfile = selectActiveProfile({ account, profiles });
  const draggingIdCategoryId = selectCategoryId(state, { id: draggingId });
  const draggingItemOrCategory = items[draggingId] || categories[draggingId];
  const isDraggingCategory = draggingId === draggingIdCategoryId;

  return (
    <C.Box aria-label="items" as="section" layerStyle="card" mt={12}>
      <D.DndContext
        collisionDetection={(args) => {
          if (args.active.id in categories) {
            return D.closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(({ id }) => id in categories),
            });
          }

          return D.rectIntersection({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              ({ id }) =>
                (id in items && isCategoryExpanded[selectCategoryId(state, { id: String(id) })]) ||
                (id in categories && (!isCategoryExpanded[id] || categories[id].items.length === 0))
            ),
          });
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

          const activeParentCategoryId = selectCategoryId(state, { id: String(active.id) });
          const finalOverCategoryId = selectCategoryId(state, { id: String(over.id) });

          if (activeParentCategoryId !== finalOverCategoryId) {
            if (!isCategoryExpanded[finalOverCategoryId] || categories[finalOverCategoryId].items.length === 0) {
              dispatch({
                fromCategoryId: activeParentCategoryId,
                id: String(active.id),
                toCategoryId: finalOverCategoryId,
                type: 'MoveItem',
              });
            }

            return;
          }

          const itemIds = categories[activeParentCategoryId].items;
          const activeItemIndex = itemIds.indexOf(String(active.id));
          const overItemIndex = itemIds.indexOf(String(over.id));

          if (activeItemIndex !== overItemIndex) {
            dispatch({
              categoryId: finalOverCategoryId,
              fromIndex: activeItemIndex,
              toIndex: overItemIndex,
              type: 'ReorderItem',
            });
          }
        }}
        onDragOver={({ active, over }: D.DragOverEvent) => {
          if (active.id in categories || !over?.id) return;
          const activeParentCategoryId = selectCategoryId(state, { id: String(active.id) });
          const newOverCategoryId = selectCategoryId(state, { id: String(over.id) });
          setDraggingOverCategoryId(newOverCategoryId);

          if (
            activeParentCategoryId !== newOverCategoryId &&
            isCategoryExpanded[newOverCategoryId] &&
            categories[newOverCategoryId].items.length > 0
          ) {
            dispatch({
              fromCategoryId: activeParentCategoryId,
              id: String(active.id),
              toCategoryId: newOverCategoryId,
              type: 'MoveItem',
            });
          }
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
            const previousCategory = categories[activeProfile.categories[categoryIndex - 1]];

            return (
              <SortableListItem
                category={category}
                focusAtPosition={category.meta?.focusAtPosition}
                id={categoryId}
                index={categoryIndex}
                isCategory
                isCategoryExpanded={isCategoryExpanded[categoryId]}
                isDropzone={draggingOverCategoryId === categoryId}
                isPreviousCategoryExpanded={isCategoryExpanded[previousCategory?.id]}
                key={categoryId}
                previousCategory={previousCategory}
                previousCategoryLastItem={items[previousCategory?.items[previousCategory.items.length - 1]]}
                toggleExpandCategory={() =>
                  setIsCategoryExpanded((state) => ({ ...state, [categoryId]: !state[categoryId] }))
                }
                value={category.text}
              >
                <DS.SortableContext items={categories[categoryId].items} strategy={DS.verticalListSortingStrategy}>
                  {categories[categoryId].items.map((itemId, itemIndex) => (
                    <SortableListItem
                      category={category}
                      focusAtPosition={items[itemId].meta?.focusAtPosition}
                      id={itemId}
                      index={itemIndex}
                      key={itemId}
                      previousItem={items[category.items[itemIndex - 1]]}
                      value={items[itemId].text}
                    />
                  ))}
                </DS.SortableContext>
                <AddButton
                  h={10}
                  onClick={() =>
                    dispatch({
                      atIndex: categories[categoryId].items.length,
                      categoryId,
                      type: 'CreateItem',
                    })
                  }
                >
                  add item
                </AddButton>
              </SortableListItem>
            );
          })}
        </DS.SortableContext>
        <AddButton
          onClick={() =>
            dispatch({
              atIndex: activeProfile.categories.length,
              type: 'CreateCategory',
            })
          }
        >
          add category
        </AddButton>
        <C.Portal>
          <D.DragOverlay dropAnimation={null}>
            {!!draggingId && (
              <ListItem
                category={categories[draggingIdCategoryId]}
                id={draggingId}
                index={0}
                isCategory={isDraggingCategory}
                isCategoryExpanded={isCategoryExpanded[draggingId]}
                isOverlay
                value={draggingItemOrCategory.text}
              >
                {isDraggingCategory ? (
                  <>
                    {categories[draggingId].items.map((itemId, index) => (
                      <ListItem
                        category={categories[draggingOverCategoryId]}
                        id={itemId}
                        index={index}
                        key={`overlay-${itemId}`}
                        value={items[itemId].text}
                      />
                    ))}
                    <AddButton h={10}>add item</AddButton>
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
