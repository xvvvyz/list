import React from 'react';
import { noop } from '@chakra-ui/utils';
import * as T from '../../../../../types';

interface SortableListContextValues {
  draggingId: T.Id;
  isCategoryExpanded: Record<string, boolean>;
  overCategoryId: T.Id;
  setCaretLocation: T.ReactSetState<[T.Id, number]>;
  setDraggingId: T.ReactSetState<T.Id>;
  setIsCategoryExpanded: T.ReactSetState<Record<string, boolean>>;
  setOverCategoryId: T.ReactSetState<T.Id>;
  inputRefs: React.MutableRefObject<Record<T.Id, React.RefObject<HTMLTextAreaElement>>>;
}

const SortableListContext = React.createContext<SortableListContextValues>({
  draggingId: '',
  isCategoryExpanded: {},
  overCategoryId: '',
  setCaretLocation: noop,
  setDraggingId: noop,
  setIsCategoryExpanded: noop,
  setOverCategoryId: noop,
  inputRefs: { current: {} },
});

export default SortableListContext;
