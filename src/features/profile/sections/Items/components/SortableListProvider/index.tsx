import React from 'react';
import * as T from '../../../../../../types';
import SortableListContext from '../../context/sortable-list';
import useInputCaret from './utilities/use-input-caret';

interface SortableListProviderProps {
  children: React.ReactNode;
}

const SortableListProvider = ({ children }: SortableListProviderProps) => {
  const [draggingId, setDraggingId] = React.useState<T.Id>('');
  const [isCategoryExpanded, setIsCategoryExpanded] = React.useState<Record<T.Id, boolean>>({});
  const [overCategoryId, setOverCategoryId] = React.useState<T.Id>('');
  const { inputRefs, setCaretLocation } = useInputCaret();

  return (
    <SortableListContext.Provider
      value={{
        draggingId,
        inputRefs,
        isCategoryExpanded,
        overCategoryId,
        setCaretLocation,
        setDraggingId,
        setIsCategoryExpanded,
        setOverCategoryId,
      }}
    >
      {children}
    </SortableListContext.Provider>
  );
};

export default SortableListProvider;
