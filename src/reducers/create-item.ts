import generateId from '../utilities/generate-id';
import { Id } from '../types';
import { State } from '../reducer';
import { IdPrefix } from '../enums';

interface CreateItemAction {
  atIndex: number;
  categoryId: Id;
  text?: string;
  type: 'CreateItem';
}

const createItem = (state: State, action: CreateItemAction) => {
  const newItem = {
    id: generateId(IdPrefix.Item),
    text: action.text || '',
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
