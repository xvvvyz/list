import { Id } from '../types';
import { State } from '../reducer';

interface MoveItemAction {
  fromCategoryId: Id;
  id: Id;
  toCategoryId: Id;
  type: 'MoveItem';
}

const moveItem = (state: State, action: MoveItemAction) => ({
  ...state,
  categories: {
    ...state.categories,
    [action.fromCategoryId]: {
      ...state.categories[action.fromCategoryId],
      items: state.categories[action.fromCategoryId].items.filter((itemId) => itemId !== action.id),
    },
    [action.toCategoryId]: {
      ...state.categories[action.toCategoryId],
      items: [String(action.id), ...state.categories[action.toCategoryId].items],
    },
  },
});

export default moveItem;
export type { MoveItemAction };
