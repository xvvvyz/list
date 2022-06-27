import { Id, Meta } from '../types';
import { State } from '../reducer';

interface UpdateItemAction {
  id: Id;
  meta?: Meta;
  text?: string;
  type: 'UpdateItem';
}

const updateItem = (state: State, action: UpdateItemAction) => ({
  ...state,
  items: {
    ...state.items,
    [action.id]: {
      ...state.items[action.id],
      meta: action.meta ?? state.items[action.id].meta,
      text: action.text ?? state.items[action.id].text,
    },
  },
});

export default updateItem;
export type { UpdateItemAction };
