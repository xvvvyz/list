import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import React from 'react';
import AccountContext from '../../../../../../../context/account';
import SortableListContext from '../../../context/sortable-list';
import useFindCategoryId from './use-find-category-id';
import useOnDragCancel from './use-on-drag-cancel';

const useOnDragEnd = () => {
  const findCategoryId = useFindCategoryId();
  const onDragCancel = useOnDragCancel();
  const { activeProfile, categories, setCategories, setProfiles } = React.useContext(AccountContext);
  const { isCategoryExpanded } = React.useContext(SortableListContext);

  return ({ active, over }: D.DragEndEvent) => {
    onDragCancel();

    if (!activeProfile || !over?.id) return;

    if (active.id in categories) {
      const activeCategoryIndex = activeProfile.categories.findIndex((c) => c.id === active.id);
      const overCategoryIndex = activeProfile.categories.findIndex((c) => c.id === over.id);

      if (activeCategoryIndex !== overCategoryIndex) {
        setProfiles((state) => ({
          ...state,
          [activeProfile.id]: {
            ...state[activeProfile.id],
            categories: DS.arrayMove(state[activeProfile.id].categories, activeCategoryIndex, overCategoryIndex),
          },
        }));
      }

      return;
    }

    const activeParentCategoryId = findCategoryId(active.id);
    const finalOverCategoryId = findCategoryId(over.id);

    if (activeParentCategoryId !== finalOverCategoryId) {
      if (!isCategoryExpanded[finalOverCategoryId] || categories[finalOverCategoryId].items.length === 0) {
        setCategories((state) => ({
          ...state,
          [activeParentCategoryId]: {
            ...state[activeParentCategoryId],
            items: state[activeParentCategoryId].items.filter((item) => item !== active.id),
          },
          [finalOverCategoryId]: {
            ...state[finalOverCategoryId],
            items: [String(active.id), ...state[finalOverCategoryId].items],
          },
        }));
      }

      return;
    }

    const itemIds = categories[activeParentCategoryId].items;
    const activeItemIndex = itemIds.indexOf(String(active.id));
    const overItemIndex = itemIds.indexOf(String(over.id));

    if (activeItemIndex !== overItemIndex) {
      setCategories((state) => ({
        ...state,
        [finalOverCategoryId]: {
          ...state[finalOverCategoryId],
          items: DS.arrayMove(state[finalOverCategoryId].items, activeItemIndex, overItemIndex),
        },
      }));
    }
  };
};

export default useOnDragEnd;
