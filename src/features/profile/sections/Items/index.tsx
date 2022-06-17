import * as C from '@chakra-ui/react';
import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Plus from '../../../../images/plus.svg';
import SortableItem from './components/SortableItem';

const Items = ({
  activeProfileId,
  categories,
  categoriesMap,
  profilesMap,
  setCategoriesMap,
  setProfilesMap,
}) => {
  if (!activeProfileId) return null;

  const findContainerId = (id) => {
    return categories.find(
      (c) => c.id === id || c.items.some((i) => i.id === id)
    )?.id;
  };

  const [activeId, setActiveId] = React.useState(null);
  const [clonedItems, setClonedItems] = React.useState(null);
  const lastOverId = React.useRef(null);
  const recentlyMovedToNewContainer = React.useRef(false);

  return (
    <C.Box as="section" mt={12}>
      <C.Heading as="h2" color="fgGhost" px={7} size="lg">
        items
      </C.Heading>
      <C.Box layerStyle="card" mt={5}>
        <D.DndContext
          collisionDetection={React.useCallback(
            (args) => {
              if (categoriesMap[activeId]) {
                return D.closestCenter({
                  ...args,
                  droppableContainers: args.droppableContainers.filter(
                    (container) => categoriesMap[container.id]
                  ),
                });
              }

              // start by finding any intersecting droppable
              const pointerIntersections = D.pointerWithin(args);

              const intersections =
                pointerIntersections.length > 0
                  ? // if there are droppables intersecting with the pointer, return those
                    pointerIntersections
                  : D.rectIntersection(args);

              let overId = D.getFirstCollision(intersections, 'id');

              if (overId) {
                const overCategory = categoriesMap[overId];

                if (overCategory) {
                  // if a container matched and it contains items
                  if (overCategory.items.length > 0) {
                    // return the closest droppable within that container
                    overId = D.closestCenter({
                      ...args,
                      droppableContainers: args.droppableContainers.filter(
                        (container) =>
                          container.id !== overId &&
                          overCategory.items.includes(container.id)
                      ),
                    })[0]?.id;
                  }
                }

                lastOverId.current = overId;
                return [{ id: overId }];
              }

              // when a draggable item moves to a new container, the layout may shift
              // and the `overId` may become `null`. we manually set the cached `lastOverId`
              // to the id of the draggable item that was moved to the new container, otherwise
              // the previous `overId` will be returned which can cause items to incorrectly shift positions
              if (recentlyMovedToNewContainer.current) {
                lastOverId.current = activeId;
              }

              // if no droppable is matched, return the last match
              return lastOverId.current ? [{ id: lastOverId.current }] : [];
            },
            [activeId, categoriesMap]
          )}
          measuring={{ droppable: { strategy: D.MeasuringStrategy.Always } }}
          onDragCancel={() => {
            if (clonedItems) {
              // reset items to their original state in case items have been
              // dragged across containers
              setCategoriesMap(clonedItems);
            }

            setActiveId(null);
            setClonedItems(null);
          }}
          onDragEnd={({ active, over }) => {
            setActiveId(null);

            const overContainerId = findContainerId(over.id);

            if (!overContainerId) return;

            const activeContainerId = findContainerId(active.id);
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

            const itemIds = categoriesMap[activeContainerId].items;
            const activeItemIndex = itemIds.indexOf(active.id);
            const overItemIndex = itemIds.indexOf(over.id);

            if (activeItemIndex !== overItemIndex) {
              setCategoriesMap({
                ...categoriesMap,
                [overContainerId]: {
                  ...categoriesMap[overContainerId],
                  items: DS.arrayMove(itemIds, activeItemIndex, overItemIndex),
                },
              });
            }
          }}
          onDragOver={({ active, over }) => {
            const overContainerId = findContainerId(over.id);
            const activeContainerId = findContainerId(active.id);

            if (
              !overContainerId ||
              categoriesMap[active.id] ||
              activeContainerId === overContainerId
            ) {
              return;
            }

            const activeItems = categoriesMap[activeContainerId].items;
            const overItems = categoriesMap[overContainerId].items;
            const activeIndex = activeItems.indexOf(active.id);
            const overIndex = overItems.indexOf(over.id);

            let newIndex: number;

            if (categoriesMap[over.id]) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            setCategoriesMap({
              ...categoriesMap,
              [activeContainerId]: {
                ...categoriesMap[activeContainerId],
                items: categoriesMap[activeContainerId].items.filter(
                  (item) => item !== active.id
                ),
              },
              [overContainerId]: {
                ...categoriesMap[overContainerId],
                items: [
                  ...categoriesMap[overContainerId].items.slice(0, newIndex),
                  categoriesMap[activeContainerId].items[activeIndex],
                  ...categoriesMap[overContainerId].items.slice(
                    newIndex,
                    categoriesMap[overContainerId].items.length
                  ),
                ],
              },
            });
          }}
          onDragStart={({ active }) => {
            setActiveId(active.id);
            setClonedItems(categoriesMap);
          }}
          sensors={D.useSensors(
            D.useSensor(D.PointerSensor),
            D.useSensor(D.KeyboardSensor, {
              coordinateGetter: DS.sortableKeyboardCoordinates,
            })
          )}
        >
          <DS.SortableContext
            items={categories}
            strategy={DS.verticalListSortingStrategy}
          >
            {categories.map((category) => (
              <SortableItem
                id={category.id}
                item={
                  <C.Textarea
                    _focus={{ boxShadow: 'none' }}
                    as={TextareaAutosize}
                    onChange={() => {}}
                    resize="none"
                    rows={1}
                    value={category.text}
                    variant="unstyled"
                  />
                }
                key={category.id}
                nested={
                  <C.Box pl={5}>
                    <DS.SortableContext
                      items={category.items}
                      strategy={DS.verticalListSortingStrategy}
                    >
                      {category.items.map((item) => (
                        <SortableItem
                          id={item.id}
                          item={
                            <C.Textarea
                              _focus={{ boxShadow: 'none' }}
                              as={TextareaAutosize}
                              onChange={() => {}}
                              resize="none"
                              rows={1}
                              value={item.text}
                              variant="unstyled"
                            />
                          }
                          key={item.id}
                        />
                      ))}
                    </DS.SortableContext>
                    <C.Button
                      h={10}
                      iconSpacing={6}
                      justifyContent="flex-start"
                      leftIcon={<C.Icon as={Plus} boxSize={6} />}
                      pl={4}
                      pr={5}
                      variant="ghost"
                      w="full"
                    >
                      add item
                    </C.Button>
                  </C.Box>
                }
                py={2}
              />
            ))}
          </DS.SortableContext>
        </D.DndContext>
        <C.Button
          h={14}
          iconSpacing={6}
          justifyContent="flex-start"
          leftIcon={<C.Icon as={Plus} boxSize={6} />}
          pl={4}
          pr={5}
          variant="ghost"
          w="full"
        >
          add category
        </C.Button>
      </C.Box>
    </C.Box>
  );
};

export default Items;
