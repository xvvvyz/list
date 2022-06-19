import * as C from '@chakra-ui/react';
import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import React from 'react';
import AddButton from '../../../../components/AddButton';
import Item from './components/Item';
import SortableItem from './components/SortableItem';

const Items = ({
  activeProfileId,
  categories,
  categoriesMap,
  itemsMap,
  profilesMap,
  setCategoriesMap,
  setProfilesMap,
}) => {
  const [activeCategoryId, setActiveCategoryId] = React.useState(null);
  const [activeElementId, setActiveElementId] = React.useState(null);
  const [isCategoryExpandedMap, setIsCategoryExpandedMap] = React.useState({});
  const sensors = D.useSensors(D.useSensor(D.PointerSensor));

  if (!activeProfileId) return null;

  const findCategoryId = (id) =>
    categories.find((c) => c.id === id || c.items.some((i) => i.id === id))?.id;

  const activeElement =
    categoriesMap[activeElementId] || itemsMap[activeElementId];

  return (
    <C.Box as="section" mt={12}>
      <C.Heading as="h2" color="fgGhost" px={7} size="lg">
        items
      </C.Heading>
      <C.Box layerStyle="card" mt={5}>
        <D.DndContext
          collisionDetection={(args) => {
            if (args.active.id in categoriesMap) {
              return D.closestCenter({
                ...args,
                droppableContainers: args.droppableContainers.filter(
                  ({ id }) => id in categoriesMap
                ),
              });
            }

            return D.rectIntersection({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                ({ id }) =>
                  (id in itemsMap &&
                    isCategoryExpandedMap[findCategoryId(id)]) ||
                  (id in categoriesMap &&
                    (!isCategoryExpandedMap[id] ||
                      categoriesMap[id].items.length === 0))
              ),
            });
          }}
          id="items-dnd-context"
          onDragCancel={() => {
            setActiveElementId(null);
            setActiveCategoryId(null);
          }}
          onDragEnd={({ active, over }) => {
            setActiveElementId(null);
            setActiveCategoryId(null);

            if (!over?.id) return;

            if (active.id in categoriesMap) {
              const categoryIds = profilesMap[activeProfileId].categories;
              const activeCategoryIndex = categoryIds.indexOf(active.id);
              const overCategoryIndex = categoryIds.indexOf(over.id);

              if (activeCategoryIndex !== overCategoryIndex) {
                setProfilesMap({
                  ...profilesMap,
                  [activeProfileId]: {
                    ...profilesMap[activeProfileId],
                    categories: DS.arrayMove(
                      categoryIds,
                      activeCategoryIndex,
                      overCategoryIndex
                    ),
                  },
                });
              }

              return;
            }

            const activeParentCategoryId = findCategoryId(active.id);
            const overCategoryId = findCategoryId(over.id);

            if (activeParentCategoryId === overCategoryId) {
              const itemIds = categoriesMap[activeParentCategoryId].items;
              const activeItemIndex = itemIds.indexOf(active.id);
              const overItemIndex = itemIds.indexOf(over.id);

              if (activeItemIndex !== overItemIndex) {
                const overCategoryId = findCategoryId(over.id);

                setCategoriesMap({
                  ...categoriesMap,
                  [overCategoryId]: {
                    ...categoriesMap[overCategoryId],
                    items: DS.arrayMove(
                      itemIds,
                      activeItemIndex,
                      overItemIndex
                    ),
                  },
                });
              }
            }
          }}
          onDragOver={({ active, over }) => {
            if (active.id in categoriesMap || !over?.id) return;

            const activeParentCategoryId = findCategoryId(active.id);
            const overCategoryId = findCategoryId(over.id);

            if (activeParentCategoryId === overCategoryId) return;

            setCategoriesMap({
              ...categoriesMap,
              [activeParentCategoryId]: {
                ...categoriesMap[activeParentCategoryId],
                items: categoriesMap[activeParentCategoryId].items.filter(
                  (item) => item !== active.id
                ),
              },
              [overCategoryId]: {
                ...categoriesMap[overCategoryId],
                items: [active.id, ...categoriesMap[overCategoryId].items],
              },
            });

            setActiveCategoryId(overCategoryId);
          }}
          onDragStart={({ active }) => {
            setActiveElementId(active.id);
            setActiveCategoryId(findCategoryId(active.id));
          }}
          sensors={sensors}
        >
          <DS.SortableContext
            items={categories}
            strategy={DS.verticalListSortingStrategy}
          >
            {categories.map((category) => (
              <SortableItem
                id={category.id}
                isActiveContainer={activeCategoryId === category.id}
                isExpanded={isCategoryExpandedMap[category.id]}
                key={category.id}
                nested={
                  <>
                    <DS.SortableContext
                      items={category.items}
                      strategy={DS.verticalListSortingStrategy}
                    >
                      {category.items.map((item) => (
                        <SortableItem
                          id={item.id}
                          key={item.id}
                          onChange={() => {}}
                          value={item.text}
                        />
                      ))}
                    </DS.SortableContext>
                    <AddButton h={10}>add item</AddButton>
                  </>
                }
                onChange={() => {}}
                toggleExpanded={() =>
                  setIsCategoryExpandedMap({
                    ...isCategoryExpandedMap,
                    [category.id]: !isCategoryExpandedMap[category.id],
                  })
                }
                value={category.text}
              />
            ))}
          </DS.SortableContext>
          <C.Portal>
            <D.DragOverlay dropAnimation={null}>
              {!!activeElement && (
                <Item
                  isExpanded={isCategoryExpandedMap[activeElementId]}
                  isOverlay
                  nested={
                    activeElement.items ? (
                      <>
                        {activeElement.items.map((itemId) => (
                          <Item
                            key={itemId}
                            onChange={() => {}}
                            value={itemsMap[itemId].text}
                          />
                        ))}
                        <AddButton h={10}>add item</AddButton>
                      </>
                    ) : undefined
                  }
                  onChange={() => {}}
                  value={activeElement.text}
                />
              )}
            </D.DragOverlay>
          </C.Portal>
        </D.DndContext>
        <AddButton>add category</AddButton>
      </C.Box>
    </C.Box>
  );
};

export default Items;
