import React from 'react';
import * as T from '../../../../../../types';
import SortableListContext from '../../context/sortable-list';
import useTextareaCaret from './utilities/use-textarea-caret';

interface SortableListProviderProps {
  children: React.ReactNode;
}

const SortableListProvider = ({ children }: SortableListProviderProps) => {
  const [draggingId, setDraggingId] = React.useState<T.Id>('');
  const [isCategoryExpanded, setIsCategoryExpanded] = React.useState<Record<T.Id, boolean>>({});
  const [overCategoryId, setOverCategoryId] = React.useState<T.Id>('');
  const { setCaretLocation, textareaRefs } = useTextareaCaret();

  return (
    <SortableListContext.Provider
      value={{
        draggingId,
        isCategoryExpanded,
        overCategoryId,
        setCaretLocation,
        setDraggingId,
        setIsCategoryExpanded,
        setOverCategoryId,
        textareaRefs,
      }}
    >
      {children}
    </SortableListContext.Provider>
  );
};

export default SortableListProvider;
