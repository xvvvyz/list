import * as D from '@dnd-kit/core';
import React from 'react';
import AccountContext from '../../../../../../../context/account';
import SortableListContext from '../../../context/sortable-list';
import useFindCategoryId from './use-find-category-id';

const useOnDragStart = () => {
  const findCategoryId = useFindCategoryId();
  const { categories } = React.useContext(AccountContext);
  const { setDraggingId, setOverCategoryId } = React.useContext(SortableListContext);

  return ({ active }: D.DragStartEvent) => {
    setDraggingId(String(active.id));
    if (active.id in categories) return;
    setOverCategoryId(findCategoryId(active.id));
  };
};

export default useOnDragStart;
