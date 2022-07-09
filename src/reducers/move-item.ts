import { Id, State } from '../types';

interface MoveItemAction {
  fromCategoryId: Id;
  id: Id;
  toCategoryId: Id;
  toIndex: number;
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
      items: [
        ...state.categories[action.toCategoryId].items.slice(0, action.toIndex),
        String(action.id),
        ...state.categories[action.toCategoryId].items.slice(action.toIndex),
      ],
    },
  },
});

export default moveItem;
export type { MoveItemAction };
