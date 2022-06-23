import * as C from '@chakra-ui/react';
import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import React from 'react';
import * as T from '../../../../types';
import AccountContext from '../../../../context/account';
import AddButton from '../../../../components/AddButton';
import Item from './components/Item';
import SortableItem from './components/SortableItem';
import generateId from '../../../../utilities/generate-id';
import { IdPrefix } from '../../../../enums';

const Items = () => {
  const { activeProfile, categories, items, setCategories, setItems, setProfiles } = React.useContext(AccountContext);
  const [draggingId, setDraggingId] = React.useState<T.Id>('');
  const [focusItem, setFocusItem] = React.useState<[T.Id, number]>(['', 0]);
  const [isExpanded, setIsExpanded] = React.useState<Record<T.Id, boolean>>({});
  const [overId, setOverId] = React.useState<T.Id>('');
  const sensors = D.useSensors(D.useSensor(D.PointerSensor));
  const textareaRefs: Record<T.Id, React.RefObject<HTMLTextAreaElement>> = {};

  React.useEffect(() => {
    if (!focusItem) return;
    const [id, index] = focusItem;
    const el = textareaRefs[id]?.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(index, index);
  }, [focusItem]);

  if (!activeProfile) return null;

  const findCategoryId = (id: T.Id): T.Id =>
    activeProfile.categories.find((c) => c.id === id || c.items.some((i) => i.id === id))?.id || '';

  const createCategory = ({ atIndex, text = '' }: { atIndex: number; text: string }) => {
    const newCategory = {
      id: generateId(IdPrefix.Category),
      items: [],
      text,
    };

    setCategories((state) => ({
      ...state,
      [newCategory.id]: newCategory,
    }));

    setProfiles((state) => ({
      ...state,
      [activeProfile.id]: {
        ...state[activeProfile.id],
        categories: [
          ...state[activeProfile.id].categories.slice(0, atIndex),
          newCategory.id,
          ...state[activeProfile.id].categories.slice(atIndex),
        ],
      },
    }));

    setFocusItem([newCategory.id, 0]);
    return newCategory;
  };

  const draggingCategory = categories[draggingId];
  const draggingItem = items[draggingId];

  return (
    <C.Box as="section" mt={12}>
      <C.Heading as="h2" color="fgGhost" px={7} size="lg">
        items
      </C.Heading>
      <C.Box layerStyle="card" mt={5}>
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
                  (id in items && isExpanded[findCategoryId(String(id))]) ||
                  (id in categories && (!isExpanded[id] || categories[id].items.length === 0))
              ),
            });
          }}
          id="items-dnd-context"
          onDragCancel={() => {
            setDraggingId('');
            setOverId('');
          }}
          onDragEnd={({ active, over }) => {
            setDraggingId('');
            setOverId('');

            if (!over?.id) return;

            const activeId = String(active.id);
            const overId = String(over?.id);

            if (activeId in categories) {
              const activeCategoryIndex = activeProfile.categories.findIndex((c) => c.id === activeId);
              const overCategoryIndex = activeProfile.categories.findIndex((c) => c.id === overId);

              if (activeCategoryIndex !== overCategoryIndex) {
                setProfiles((state) => ({
                  ...state,
                  [activeProfile.id]: {
                    ...state[activeProfile.id],
                    categories: DS.arrayMove(
                      state[activeProfile.id].categories,
                      activeCategoryIndex,
                      overCategoryIndex
                    ),
                  },
                }));
              }

              return;
            }

            const activeParentCategoryId = findCategoryId(activeId);
            const overCategoryId = findCategoryId(overId);

            if (activeParentCategoryId === overCategoryId) {
              const itemIds = categories[activeParentCategoryId].items;
              const activeItemIndex = itemIds.indexOf(activeId);
              const overItemIndex = itemIds.indexOf(overId);

              if (activeItemIndex !== overItemIndex) {
                const overCategoryId = findCategoryId(overId);

                setCategories((state) => ({
                  ...state,
                  [overCategoryId]: {
                    ...state[overCategoryId],
                    items: DS.arrayMove(state[overCategoryId].items, activeItemIndex, overItemIndex),
                  },
                }));
              }
            }
          }}
          onDragOver={({ active, over }) => {
            if (active.id in categories || !over?.id) return;

            const activeId = String(active.id);
            const overId = String(over?.id);

            const activeParentCategoryId = findCategoryId(activeId);
            const overCategoryId = findCategoryId(overId);

            if (activeParentCategoryId === overCategoryId) return;

            setCategories((state) => ({
              ...state,
              [activeParentCategoryId]: {
                ...state[activeParentCategoryId],
                items: state[activeParentCategoryId].items.filter((item) => item !== activeId),
              },
              [overCategoryId]: {
                ...state[overCategoryId],
                items: [activeId, ...state[overCategoryId].items],
              },
            }));

            setOverId(overCategoryId);
          }}
          onDragStart={({ active }) => {
            const activeId = String(active.id);
            setDraggingId(activeId);
            setOverId(findCategoryId(activeId));
          }}
          sensors={sensors}
        >
          <DS.SortableContext items={activeProfile.categories} strategy={DS.verticalListSortingStrategy}>
            {activeProfile.categories.map((category, categoryIndex) => {
              const createItem = ({ atIndex, text = '' }: { atIndex: number; text: string }) => {
                const newItem = { id: generateId(IdPrefix.Item), text };
                setItems((state) => ({ ...state, [newItem.id]: newItem }));

                setCategories((state) => ({
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

                setFocusItem([newItem.id, 0]);
                return newItem;
              };

              const deleteCategory = () =>
                setProfiles((state) => ({
                  ...state,
                  [activeProfile.id]: {
                    ...state[activeProfile.id],
                    categories: state[activeProfile.id].categories.filter((c) => c !== category.id),
                  },
                }));

              textareaRefs[category.id] = React.createRef();

              return (
                <SortableItem
                  id={category.id}
                  isActiveDropzone={overId === category.id}
                  isExpanded={isExpanded[category.id]}
                  key={category.id}
                  nestedItems={
                    <>
                      <DS.SortableContext items={category.items} strategy={DS.verticalListSortingStrategy}>
                        {category.items.map((item, itemIndex) => {
                          const deleteItem = () =>
                            setCategories((state) => ({
                              ...state,
                              [category.id]: {
                                ...state[category.id],
                                items: state[category.id].items.filter((i) => i !== item.id),
                              },
                            }));

                          textareaRefs[item.id] = React.createRef();

                          return (
                            <SortableItem
                              id={item.id}
                              key={item.id}
                              onDelete={deleteItem}
                              textareaProps={{
                                onBackspaceDelete: ({ carry }) => {
                                  const previousItemId = categories[category.id].items[itemIndex - 1];

                                  if (previousItemId) {
                                    setItems((state) => ({
                                      ...state,
                                      [previousItemId]: {
                                        ...state[previousItemId],
                                        text: state[previousItemId].text + carry,
                                      },
                                    }));

                                    setFocusItem([previousItemId, items[previousItemId].text.length]);
                                    return;
                                  }

                                  setCategories((state) => ({
                                    ...state,
                                    [category.id]: {
                                      ...state[category.id],
                                      text: state[category.id].text + carry,
                                    },
                                  }));

                                  setFocusItem([category.id, category.text.length]);
                                },
                                onChange: ({ value }) =>
                                  setItems((state) => ({
                                    ...state,
                                    [item.id]: { ...state[item.id], text: value },
                                  })),
                                onEnter: ({ carry }) => {
                                  setItems((state) => ({
                                    ...state,
                                    [item.id]: {
                                      ...state[item.id],
                                      text: state[item.id].text.replace(carry, ''),
                                    },
                                  }));

                                  createItem({
                                    atIndex: itemIndex + 1,
                                    text: carry,
                                  });
                                },
                                ref: textareaRefs[item.id],
                                value: item.text,
                              }}
                            />
                          );
                        })}
                      </DS.SortableContext>
                      <AddButton h={10} onClick={() => createItem({ atIndex: category.items.length, text: '' })}>
                        add item
                      </AddButton>
                    </>
                  }
                  onDelete={deleteCategory}
                  textareaProps={{
                    onBackspaceDelete: ({ carry }) => {
                      const previousCategoryId = categories[categoryIndex - 1].id;
                      if (!previousCategoryId) return;

                      if (isExpanded[previousCategoryId]) {
                        const previousCategoryLastItemId =
                          categories[previousCategoryId].items[categories[previousCategoryId].items.length - 1];

                        setItems((state) => ({
                          ...state,
                          [previousCategoryLastItemId]: {
                            ...state[previousCategoryLastItemId],
                            text: state[previousCategoryLastItemId].text + carry,
                          },
                        }));

                        setFocusItem([previousCategoryLastItemId, items[previousCategoryLastItemId].text.length]);
                        return;
                      }

                      setCategories((state) => ({
                        ...state,
                        [previousCategoryId]: {
                          ...state[previousCategoryId],
                          text: state[previousCategoryId].text + carry,
                        },
                      }));

                      setFocusItem([previousCategoryId, categories[previousCategoryId].text.length]);
                    },
                    onChange: ({ value }) =>
                      setCategories((state) => ({
                        ...state,
                        [category.id]: { ...state[category.id], text: value },
                      })),
                    onEnter: ({ carry }) => {
                      setCategories((state) => ({
                        ...state,
                        [category.id]: {
                          ...state[category.id],
                          text: state[category.id].text.replace(carry, ''),
                        },
                      }));

                      if (isExpanded[category.id]) {
                        createItem({ atIndex: 0, text: carry });
                        return;
                      }

                      createCategory({ atIndex: categoryIndex + 1, text: carry });
                    },
                    ref: textareaRefs[category.id],
                    value: category.text,
                  }}
                  toggleExpanded={() =>
                    setIsExpanded((state) => ({
                      ...state,
                      [category.id]: !state[category.id],
                    }))
                  }
                />
              );
            })}
          </DS.SortableContext>
          <C.Portal>
            <D.DragOverlay dropAnimation={null}>
              {!!draggingId && (
                <Item
                  id={`overlay-${draggingId}`}
                  isExpanded={isExpanded[draggingId]}
                  isOverlay
                  nestedItems={
                    draggingCategory ? (
                      <>
                        {draggingCategory.items.map((itemId) => (
                          <Item
                            id={`overlay-${itemId}`}
                            key={`overlay-${itemId}`}
                            textareaProps={{ value: items[itemId].text }}
                          />
                        ))}
                        <AddButton h={10}>add item</AddButton>
                      </>
                    ) : undefined
                  }
                  textareaProps={{
                    value: (draggingCategory || draggingItem).text,
                  }}
                />
              )}
            </D.DragOverlay>
          </C.Portal>
        </D.DndContext>
        <AddButton onClick={() => createCategory({ atIndex: activeProfile.categories.length, text: '' })}>
          add category
        </AddButton>
      </C.Box>
    </C.Box>
  );
};

export default Items;
