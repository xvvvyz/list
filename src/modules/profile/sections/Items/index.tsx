import * as C from '@chakra-ui/react';
import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import React, { useState } from 'react';
import noop from 'lodash/noop';
import AddButton from '../../components/AddButton';
import ListItem from './components/ListItem';
import SortableListItem from './components/SortableListItem';
import generateId from '../../../../utilities/generate-id';
import getCategoryId from './utilities/get-category-id';
import useActiveProfile from '../../../../hooks/use-active-profile';
import useAllCategoryMap from '../../../../hooks/use-all-category-map';
import useAllItemMap from '../../../../hooks/use-all-item-map';
import useAutoResetState from '../../../../hooks/use-auto-reset-state';
import useReplicache from '../../../../hooks/use-replicache';
import { Category } from '../../../../models/category';
import { Item } from '../../../../models/item';

const Items = () => {
  const [draggingId, setDraggingId] = useState('');
  const [draggingOverCategoryId, setDraggingOverCategoryId] = useState('');
  const [focusAtPosition, setFocusAtPosition] = useAutoResetState<[string, number]>(['', 0]);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<Record<string, boolean>>({});
  const activeProfile = useActiveProfile();
  const categoriesMap = useAllCategoryMap();
  const itemsMap = useAllItemMap();
  const replicache = useReplicache();
  const sensors = D.useSensors(D.useSensor(D.MouseSensor), D.useSensor(D.TouchSensor));
  if (!activeProfile) return null;
  const draggingIdCategoryId = getCategoryId(categoriesMap, draggingId);
  const draggingItemOrCategory = itemsMap[draggingId] || categoriesMap[draggingId];

  return (
    <C.Box aria-label="items" as="section" layerStyle="bgCard" mt={12}>
      <D.DndContext
        collisionDetection={(args) => {
          if (args.active.id in categoriesMap) {
            return D.closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(({ id }) => id in categoriesMap),
            });
          }

          const overId = D.getFirstCollision(D.rectIntersection(args), 'id');
          if (!overId) return [];

          if (overId in categoriesMap && isCategoryExpanded[overId] && categoriesMap[overId].itemIds.length) {
            return D.closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(({ id }) =>
                categoriesMap[overId].itemIds.includes(String(id))
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
        onDragEnd={async ({ active, over }: D.DragEndEvent) => {
          if (!replicache) return;

          setDraggingId('');
          setDraggingOverCategoryId('');

          if (!activeProfile || !over?.id) return;

          if (active.id in categoriesMap) {
            const activeCategoryIndex = activeProfile.categoryIds.findIndex((id) => id === active.id);
            const overCategoryIndex = activeProfile.categoryIds.findIndex((id) => id === over.id);

            if (activeCategoryIndex !== overCategoryIndex) {
              await replicache.mutate.reorderCategory({
                accountId: replicache.name,
                fromIndex: activeCategoryIndex,
                toIndex: overCategoryIndex,
              });
            }

            return;
          }

          const fromCategoryId = getCategoryId(categoriesMap, String(active.id));
          const toCategoryId = getCategoryId(categoriesMap, String(over.id));

          if (fromCategoryId !== toCategoryId) {
            if (!isCategoryExpanded[toCategoryId] || categoriesMap[toCategoryId].itemIds.length === 0) {
              await replicache.mutate.moveItem({
                fromCategoryId,
                id: String(active.id),
                toCategoryId,
                toIndex: 0,
              });
            }

            return;
          }

          const itemIds = categoriesMap[fromCategoryId].itemIds;
          const fromIndex = itemIds.indexOf(String(active.id));
          const toIndex = itemIds.indexOf(String(over.id));

          if (fromIndex === toIndex) return;

          await replicache.mutate.reorderItem({
            categoryId: fromCategoryId,
            fromIndex,
            toIndex,
          });
        }}
        onDragOver={async ({ active, over }: D.DragOverEvent) => {
          if (!replicache) return;

          if (active.id in categoriesMap || !over?.id) {
            setDraggingOverCategoryId('');
            return;
          }

          const fromCategoryId = getCategoryId(categoriesMap, String(active.id));
          const toCategoryId = getCategoryId(categoriesMap, String(over.id));
          setDraggingOverCategoryId(toCategoryId);

          if (
            fromCategoryId === toCategoryId ||
            !isCategoryExpanded[toCategoryId] ||
            !categoriesMap[toCategoryId].itemIds.length
          ) {
            return;
          }

          const fromCategoryIndex = activeProfile.categoryIds.indexOf(fromCategoryId);
          const toCategoryIndex = activeProfile.categoryIds.indexOf(toCategoryId);
          const overItems = categoriesMap[toCategoryId].itemIds;
          const overItemIndex = overItems.indexOf(String(over.id));

          const toIndex =
            overItemIndex || (overItems.length === 1 && fromCategoryIndex > toCategoryIndex) ? 0 : overItems.length;

          await replicache.mutate.moveItem({
            fromCategoryId,
            id: String(active.id),
            toCategoryId,
            toIndex,
          });
        }}
        onDragStart={({ active }: D.DragStartEvent) => {
          setDraggingId(String(active.id));
          if (active.id in categoriesMap) return;
          setDraggingOverCategoryId(getCategoryId(categoriesMap, String(active.id)));
        }}
        sensors={sensors}
      >
        <DS.SortableContext items={activeProfile.categoryIds} strategy={DS.verticalListSortingStrategy}>
          {activeProfile.categoryIds.map((categoryId, categoryIndex) => {
            let previous: Category | Item | undefined = categoriesMap[categoryIndex - 1];

            if (previous && isCategoryExpanded[previous.id] && (previous as Category).itemIds.length) {
              const previousItemIds = (previous as Category).itemIds;
              previous = itemsMap[previousItemIds[previousItemIds.length - 1]];
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
                previousIsCategory={!!(previous as Category)?.itemIds}
                previousText={previous?.text}
                setFocusAtPosition={setFocusAtPosition}
                toggleExpandCategory={() =>
                  setIsCategoryExpanded((state) => ({ ...state, [categoryId]: !state[categoryId] }))
                }
                value={categoriesMap[categoryId].text}
              >
                <DS.SortableContext items={categoriesMap[categoryId].itemIds} strategy={DS.verticalListSortingStrategy}>
                  {categoriesMap[categoryId].itemIds.map((itemId, itemIndex) => {
                    previous = itemsMap[categoriesMap[categoryId].itemIds[itemIndex - 1]] || categoriesMap[categoryId];

                    return (
                      <SortableListItem
                        categoryId={categoryId}
                        focusAtPosition={focusAtPosition[0] === itemId ? focusAtPosition[1] : undefined}
                        id={itemId}
                        index={itemIndex}
                        key={itemId}
                        previousId={previous.id}
                        previousIsCategory={!!(previous as Category).itemIds}
                        previousText={previous.text}
                        setFocusAtPosition={setFocusAtPosition}
                        value={itemsMap[itemId].text}
                      />
                    );
                  })}
                </DS.SortableContext>
                <AddButton
                  onClick={async () => {
                    if (!replicache) return;
                    const id = generateId();

                    await replicache.mutate.createItem({
                      atIndex: categoriesMap[categoryId].itemIds.length,
                      categoryId,
                      id,
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
          onClick={async () => {
            if (!replicache) return;
            const id = generateId();

            await replicache.mutate.createCategory({
              accountId: replicache.name,
              atIndex: activeProfile.categoryIds.length,
              id,
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
                isCategory={draggingId === draggingIdCategoryId}
                isCategoryExpanded={isCategoryExpanded[draggingId]}
                isOverlay
                setFocusAtPosition={noop}
                value={draggingItemOrCategory.text}
              >
                {draggingId === draggingIdCategoryId ? (
                  <>
                    {categoriesMap[draggingId].itemIds.map((itemId, index) => (
                      <ListItem
                        categoryId={draggingOverCategoryId}
                        id={itemId}
                        index={index}
                        key={`overlay-${itemId}`}
                        setFocusAtPosition={noop}
                        value={itemsMap[itemId].text}
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
