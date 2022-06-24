import React from 'react';
import SortableListContext from '../../../context/sortable-list';

const useOnDragCancel = () => {
  const { setDraggingId, setOverCategoryId } = React.useContext(SortableListContext);

  return () => {
    setDraggingId('');
    setOverCategoryId('');
  };
};

export default useOnDragCancel;
