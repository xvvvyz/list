import { Id, State } from '../types';

interface DeleteItemAction {
  categoryId: Id;
  id: Id;
  type: 'DeleteItem';
}

const deleteItem = (state: State, action: DeleteItemAction) => ({
  ...state,
  categories: {
    ...state.categories,
    [action.categoryId]: {
      ...state.categories[action.categoryId],
      items: state.categories[action.categoryId].items.filter((id) => id !== action.id),
    },
  },
});

export default deleteItem;
export type { DeleteItemAction };
