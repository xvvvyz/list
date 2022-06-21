import * as C from '@chakra-ui/react';
import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import React from 'react';
import AddButton from '../../../../components/AddButton';
import Item from './components/Item';
import SortableItem from './components/SortableItem';
import generateId from '../../../../utilities/generate-id';

const Items = ({
  activeProfileId,
  categories,
  categoriesMap,
  itemsMap,
  profilesMap,
  setCategoriesMap,
  setItemsMap,
  setProfilesMap,
}) => {
  const [activeCategoryId, setActiveCategoryId] = React.useState(null);
  const [activeElementId, setActiveElementId] = React.useState(null);
  const [focusByIdAtIndex, setFocusByIdAtIndex] = React.useState([]);
  const [isCategoryExpandedMap, setIsCategoryExpandedMap] = React.useState({});
  const idRefMap = {};
  const sensors = D.useSensors(D.useSensor(D.PointerSensor));

  React.useEffect(() => {
    const [id, index] = focusByIdAtIndex;
    if (!id) return;
    const el = idRefMap[id].current;
    el.focus();
    el.setSelectionRange(index, index);
  }, [focusByIdAtIndex]);

  if (!activeProfileId) return null;

  const findCategoryId = (id) =>
    categories.find((c) => c.id === id || c.items.some((i) => i.id === id))?.id;

  const createCategory = ({ atIndex, text = '' }) => {
    const newCategory = { id: generateId(), items: [], text };
    setCategoriesMap((state) => ({ ...state, [newCategory.id]: newCategory }));

    setProfilesMap((state) => ({
      ...state,
      [activeProfileId]: {
        ...state[activeProfileId],
        categories: [
          ...state[activeProfileId].categories.slice(0, atIndex),
          newCategory.id,
          ...state[activeProfileId].categories.slice(atIndex),
        ],
      },
    }));

    setFocusByIdAtIndex([newCategory.id, 0]);
    return newCategory;
  };

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
            {categories.map((category, categoryIndex) => {
              const createItem = ({ atIndex, text = '' }) => {
                const newItem = {
                  id: generateId(),
                  text,
                };

                setItemsMap((state) => ({
                  ...state,
                  [newItem.id]: newItem,
                }));

                setCategoriesMap((state) => ({
                  ...state,
                  [category.id]: {
                    ...state[category.id],
                    items: [
                      ...state[category.id].items.slice(0, atIndex),
                      newItem.id,
                      ...state[category.id].items.slice(atIndex),
                    ],
                  },
                }));

                setFocusByIdAtIndex([newItem.id, 0]);

                return newItem;
              };

              const deleteCategory = () =>
                setProfilesMap((state) => ({
                  ...state,
                  [activeProfileId]: {
                    ...state[activeProfileId],
                    categories: state[activeProfileId].categories.filter(
                      (c) => c !== category.id
                    ),
                  },
                }));

              idRefMap[category.id] = React.createRef();

              return (
                <SortableItem
                  id={category.id}
                  inputRef={idRefMap[category.id]}
                  isActiveContainer={activeCategoryId === category.id}
                  isExpanded={isCategoryExpandedMap[category.id]}
                  key={category.id}
                  nested={
                    <>
                      <DS.SortableContext
                        items={category.items}
                        strategy={DS.verticalListSortingStrategy}
                      >
                        {category.items.map((item, itemIndex) => {
                          const deleteItem = () =>
                            setCategoriesMap((state) => ({
                              ...state,
                              [category.id]: {
                                ...state[category.id],
                                items: state[category.id].items.filter(
                                  (i) => i !== item.id
                                ),
                              },
                            }));

                          idRefMap[item.id] = React.createRef();

                          return (
                            <SortableItem
                              id={item.id}
                              inputRef={idRefMap[item.id]}
                              key={item.id}
                              onBackspaceDelete={({ carry }) => {
                                deleteItem();

                                const previousItemId =
                                  categoriesMap[category.id].items[
                                    itemIndex - 1
                                  ];

                                if (previousItemId) {
                                  setItemsMap((state) => ({
                                    ...state,
                                    [previousItemId]: {
                                      ...state[previousItemId],
                                      text: state[previousItemId].text + carry,
                                    },
                                  }));

                                  setFocusByIdAtIndex([
                                    previousItemId,
                                    itemsMap[previousItemId].text.length,
                                  ]);

                                  return;
                                }

                                setCategoriesMap((state) => ({
                                  ...state,
                                  [category.id]: {
                                    ...state[category.id],
                                    text: state[category.id].text + carry,
                                  },
                                }));

                                setFocusByIdAtIndex([
                                  category.id,
                                  category.text.length,
                                ]);
                              }}
                              onChange={({ target }) =>
                                setItemsMap((state) => ({
                                  ...state,
                                  [item.id]: {
                                    ...state[item.id],
                                    text: target.value,
                                  },
                                }))
                              }
                              onDelete={deleteItem}
                              onEnter={({ carry }) => {
                                setItemsMap((state) => ({
                                  ...state,
                                  [item.id]: {
                                    ...state[item.id],
                                    text: state[item.id].text.replace(
                                      carry,
                                      ''
                                    ),
                                  },
                                }));

                                createItem({
                                  atIndex: itemIndex + 1,
                                  text: carry,
                                });
                              }}
                              value={item.text}
                            />
                          );
                        })}
                      </DS.SortableContext>
                      <AddButton
                        h={10}
                        onClick={() =>
                          createItem({ atIndex: category.items.length })
                        }
                      >
                        add item
                      </AddButton>
                    </>
                  }
                  onBackspaceDelete={({ carry }) => {
                    deleteCategory();

                    const previousCategoryId =
                      profilesMap[activeProfileId].categories[
                        categoryIndex - 1
                      ];

                    if (!previousCategoryId) return;

                    if (isCategoryExpandedMap[previousCategoryId]) {
                      const previousCategoryLastItemId =
                        categoriesMap[previousCategoryId].items[
                          categoriesMap[previousCategoryId].items.length - 1
                        ];

                      setItemsMap((state) => ({
                        ...state,
                        [previousCategoryLastItemId]: {
                          ...state[previousCategoryLastItemId],
                          text: state[previousCategoryLastItemId].text + carry,
                        },
                      }));

                      setFocusByIdAtIndex([
                        previousCategoryLastItemId,
                        itemsMap[previousCategoryLastItemId].text.length,
                      ]);

                      return;
                    }

                    setCategoriesMap((state) => ({
                      ...state,
                      [previousCategoryId]: {
                        ...state[previousCategoryId],
                        text: state[previousCategoryId].text + carry,
                      },
                    }));

                    setFocusByIdAtIndex([
                      previousCategoryId,
                      categoriesMap[previousCategoryId].text.length,
                    ]);
                  }}
                  onChange={({ target }) =>
                    setCategoriesMap({
                      ...categoriesMap,
                      [category.id]: {
                        ...categoriesMap[category.id],
                        text: target.value,
                      },
                    })
                  }
                  onDelete={deleteCategory}
                  onEnter={({ carry }) => {
                    setCategoriesMap((state) => ({
                      ...state,
                      [category.id]: {
                        ...state[category.id],
                        text: state[category.id].text.replace(carry, ''),
                      },
                    }));

                    if (isCategoryExpandedMap[category.id]) {
                      createItem({ atIndex: 0, text: carry });
                      return;
                    }

                    createCategory({ atIndex: categoryIndex + 1, text: carry });
                  }}
                  toggleExpanded={() =>
                    setIsCategoryExpandedMap({
                      ...isCategoryExpandedMap,
                      [category.id]: !isCategoryExpandedMap[category.id],
                    })
                  }
                  value={category.text}
                />
              );
            })}
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
                          <Item key={itemId} value={itemsMap[itemId].text} />
                        ))}
                        <AddButton h={10}>add item</AddButton>
                      </>
                    ) : undefined
                  }
                  value={activeElement.text}
                />
              )}
            </D.DragOverlay>
          </C.Portal>
        </D.DndContext>
        <AddButton
          onClick={() => createCategory({ atIndex: categories.length })}
        >
          add category
        </AddButton>
      </C.Box>
    </C.Box>
  );
};

export default Items;
