import { arrayMove } from '@dnd-kit/sortable';
import { Id } from '../types';
import { State } from '../reducer';

interface ReorderItemAction {
  categoryId: Id;
  fromIndex: number;
  toIndex: number;
  type: 'ReorderItem';
}

const reorderItem = (state: State, action: ReorderItemAction) => ({
  ...state,
  categories: {
    ...state.categories,
    [action.categoryId]: {
      ...state.categories[action.categoryId],
      items: arrayMove(state.categories[action.categoryId].items, action.fromIndex, action.toIndex),
    },
  },
});

export default reorderItem;
export type { ReorderItemAction };
