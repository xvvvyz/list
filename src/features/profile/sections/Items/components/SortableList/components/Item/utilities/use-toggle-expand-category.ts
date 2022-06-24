import React from 'react';
import * as T from '../../../../../../../../../types';
import SortableListContext from '../../../../../context/sortable-list';

const useToggleExpandCategory = ({ categoryId }: { categoryId: T.Id }) => {
  const { setIsCategoryExpanded } = React.useContext(SortableListContext);

  return () =>
    setIsCategoryExpanded((state) => ({
      ...state,
      [categoryId]: !state[categoryId],
    }));
};

export default useToggleExpandCategory;
