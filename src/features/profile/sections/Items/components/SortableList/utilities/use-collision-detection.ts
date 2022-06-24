import * as D from '@dnd-kit/core';
import React from 'react';
import AccountContext from '../../../../../../../context/account';
import SortableListContext from '../../../context/sortable-list';
import useFindCategoryId from './use-find-category-id';

const useCollisionDetection = () => {
  const findCategoryId = useFindCategoryId();
  const { categories, items } = React.useContext(AccountContext);
  const { isCategoryExpanded } = React.useContext(SortableListContext);

  return ((args) => {
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
          (id in items && isCategoryExpanded[findCategoryId(id)]) ||
          (id in categories && (!isCategoryExpanded[id] || categories[id].items.length === 0))
      ),
    });
  }) as D.CollisionDetection;
};

export default useCollisionDetection;
