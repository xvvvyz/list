import * as D from '@dnd-kit/core';
import React from 'react';
import AccountContext from '../../../../../../../context/account';
import SortableListContext from '../../../context/sortable-list';
import useFindCategoryId from './use-find-category-id';

const useOnDragOver = () => {
  const findCategoryId = useFindCategoryId();
  const { categories, setCategories } = React.useContext(AccountContext);
  const { isCategoryExpanded, setOverCategoryId } = React.useContext(SortableListContext);

  return ({ active, over }: D.DragOverEvent) => {
    if (active.id in categories || !over?.id) return;
    const activeParentCategoryId = findCategoryId(active.id);
    const newOverCategoryId = findCategoryId(over.id);
    setOverCategoryId(newOverCategoryId);

    if (
      activeParentCategoryId !== newOverCategoryId &&
      isCategoryExpanded[newOverCategoryId] &&
      categories[newOverCategoryId].items.length > 0
    ) {
      setCategories((state) => ({
        ...state,
        [activeParentCategoryId]: {
          ...state[activeParentCategoryId],
          items: state[activeParentCategoryId].items.filter((item) => item !== active.id),
        },
        [newOverCategoryId]: {
          ...state[newOverCategoryId],
          items: [String(active.id), ...state[newOverCategoryId].items],
        },
      }));
    }
  };
};

export default useOnDragOver;
