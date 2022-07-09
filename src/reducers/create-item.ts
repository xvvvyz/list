import { Id, State } from '../types';

interface CreateItemAction {
  atIndex: number;
  categoryId: Id;
  id: Id;
  text?: string;
  type: 'CreateItem';
}

const createItem = (state: State, action: CreateItemAction) => {
  const newItem = {
    id: action.id,
    text: action.text ?? '',
  };

  return {
    ...state,
    categories: {
      ...state.categories,
      [action.categoryId]: {
        ...state.categories[action.categoryId],
        items: [
          ...state.categories[action.categoryId].items.slice(0, action.atIndex),
          newItem.id,
          ...state.categories[action.categoryId].items.slice(action.atIndex),
        ],
      },
    },
    items: {
      ...state.items,
      [newItem.id]: newItem,
    },
  };
};

export default createItem;
export type { CreateItemAction };
