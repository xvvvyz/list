import { Id } from '../types';
import { State } from '../reducer';

interface UpdateItemAction {
  id: Id;
  text: string;
  type: 'UpdateItem';
}

const updateItem = (state: State, action: UpdateItemAction) => ({
  ...state,
  items: {
    ...state.items,
    [action.id]: {
      ...state.items[action.id],
      text: action.text,
    },
  },
});

export default updateItem;
export type { UpdateItemAction };
