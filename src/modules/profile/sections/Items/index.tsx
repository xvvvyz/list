import * as C from '@chakra-ui/react';
import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import noop from 'lodash/noop';
import { useState } from 'react';
import useActiveProfile from '../../../../hooks/use-active-profile';
import useAllCategoryAndItemMap from '../../../../hooks/use-all-category-and-item-map';
import useEphemeralState from '../../../../hooks/use-ephemeral-state';
import useReplicache from '../../../../hooks/use-replicache';
import { Category } from '../../../../models/category';
import { Item } from '../../../../models/item';
import generateId from '../../../../utilities/generate-id';
import AddButton from '../../components/AddButton';
import ListItem from './components/ListItem';
import SortableListItem from './components/SortableListItem';
import getCategoryId from './utilities/get-category-id';

const Items = () => {
  const [draggingId, setDraggingId] = useState('');
  const [draggingOverCategoryId, setDraggingOverCategoryId] = useState('');
  const [focusAtPosition, setFocusAtPosition] = useEphemeralState<[string, number]>(['', 0]);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<Record<string, boolean>>({});
  const activeProfile = useActiveProfile();
  const replicache = useReplicache();
  const sensors = D.useSensors(D.useSensor(D.MouseSensor), D.useSensor(D.TouchSensor));
  const { categoryMap, itemMap } = useAllCategoryAndItemMap();
  if (!activeProfile) return null;
  const draggingIdCategoryId = getCategoryId(categoryMap, draggingId);
  const draggingItemOrCategory = itemMap[draggingId] || categoryMap[draggingId];

  return (
    <C.Box aria-label="items" as="section" layerStyle="bgCard" mt={12}>
      <D.DndContext
        collisionDetection={(args) => {
          if (args.active.id in categoryMap) {
            return D.closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(({ id }) => id in categoryMap),
            });
          }

          const overId = D.getFirstCollision(D.rectIntersection(args), 'id');
          if (!overId) return [];

          if (overId in categoryMap && isCategoryExpanded[overId] && categoryMap[overId].itemIds.length) {
            return D.closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(({ id }) =>
                categoryMap[overId].itemIds.includes(String(id))
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
          if (!over?.id) return;

          if (active.id in categoryMap) {
            const activeCategoryIndex = activeProfile.categoryIds.findIndex((id) => id === active.id);
            const overCategoryIndex = activeProfile.categoryIds.findIndex((id) => id === over.id);

            if (activeCategoryIndex !== overCategoryIndex) {
              await replicache.mutate.reorderCategory({
                accountId: replicache.name,
                id: String(active.id),
                toIndex: overCategoryIndex,
              });
            }

            return;
          }

          const fromCategoryId = getCategoryId(categoryMap, String(active.id));
          const toCategoryId = getCategoryId(categoryMap, String(over.id));

          if (fromCategoryId !== toCategoryId) {
            if (!isCategoryExpanded[toCategoryId] || categoryMap[toCategoryId].itemIds.length === 0) {
              await replicache.mutate.moveItem({
                fromCategoryId,
                id: String(active.id),
                toCategoryId,
                toIndex: 0,
              });
            }

            return;
          }

          const itemIds = categoryMap[fromCategoryId].itemIds;
          const fromIndex = itemIds.indexOf(String(active.id));
          const toIndex = itemIds.indexOf(String(over.id));
          if (fromIndex === toIndex) return;

          await replicache.mutate.reorderItem({
            categoryId: fromCategoryId,
            id: String(active.id),
            toIndex,
          });
        }}
        onDragOver={async ({ active, over }: D.DragOverEvent) => {
          if (!replicache) return;

          if (active.id in categoryMap || !over?.id) {
            setDraggingOverCategoryId('');
            return;
          }

          const fromCategoryId = getCategoryId(categoryMap, String(active.id));
          const toCategoryId = getCategoryId(categoryMap, String(over.id));
          setDraggingOverCategoryId(toCategoryId);

          if (
            fromCategoryId === toCategoryId ||
            !isCategoryExpanded[toCategoryId] ||
            !categoryMap[toCategoryId].itemIds.length
          ) {
            return;
          }

          const fromCategoryIndex = activeProfile.categoryIds.indexOf(fromCategoryId);
          const toCategoryIndex = activeProfile.categoryIds.indexOf(toCategoryId);
          const overItems = categoryMap[toCategoryId].itemIds;
          const overItemIndex = overItems.indexOf(String(over.id));

          await replicache.mutate.moveItem({
            fromCategoryId,
            id: String(active.id),
            toCategoryId,
            toIndex:
              overItemIndex || (overItems.length === 1 && fromCategoryIndex > toCategoryIndex) ? 0 : overItems.length,
          });
        }}
        onDragStart={({ active }: D.DragStartEvent) => {
          setDraggingId(String(active.id));
          if (active.id in categoryMap) return;
          setDraggingOverCategoryId(getCategoryId(categoryMap, String(active.id)));
        }}
        sensors={sensors}
      >
        <DS.SortableContext items={activeProfile.categoryIds} strategy={DS.verticalListSortingStrategy}>
          {activeProfile.categoryIds.map((categoryId, categoryIndex) => {
            if (!categoryMap[categoryId]) return null;
            let previous: Category | Item | undefined = categoryMap[activeProfile.categoryIds[categoryIndex - 1]];

            if (previous && isCategoryExpanded[previous.id] && (previous as Category).itemIds.length) {
              const previousItemIds = (previous as Category).itemIds;
              previous = itemMap[previousItemIds[previousItemIds.length - 1]];
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
                value={categoryMap[categoryId].text}
              >
                <DS.SortableContext items={categoryMap[categoryId].itemIds} strategy={DS.verticalListSortingStrategy}>
                  {categoryMap[categoryId].itemIds.map((itemId, itemIndex) => {
                    if (!itemMap[itemId]) return null;
                    previous = itemMap[categoryMap[categoryId].itemIds[itemIndex - 1]] || categoryMap[categoryId];

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
                        value={itemMap[itemId].text}
                      />
                    );
                  })}
                </DS.SortableContext>
                <AddButton
                  onClick={async () => {
                    if (!replicache) return;
                    const id = generateId();

                    await replicache.mutate.createItem({
                      atIndex: categoryMap[categoryId].itemIds.length,
                      categoryId,
                      id,
                    });

                    setFocusAtPosition([id, 0]);
                  }}
                  size="sm"
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
                    {categoryMap[draggingId].itemIds.map((itemId, index) => (
                      <ListItem
                        categoryId={draggingOverCategoryId}
                        id={itemId}
                        index={index}
                        key={`overlay-${itemId}`}
                        setFocusAtPosition={noop}
                        value={itemMap[itemId].text}
                      />
                    ))}
                    <AddButton size="sm">add item</AddButton>
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
