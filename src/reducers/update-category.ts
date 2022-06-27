import { Id, Meta } from '../types';
import { State } from '../reducer';

interface UpdateCategoryAction {
  id: Id;
  meta?: Meta;
  text?: string;
  type: 'UpdateCategory';
}

const updateCategory = (state: State, action: UpdateCategoryAction) => ({
  ...state,
  categories: {
    ...state.categories,
    [action.id]: {
      ...state.categories[action.id],
      meta: action.meta ?? state.categories[action.id].meta,
      text: action.text ?? state.categories[action.id].text,
    },
  },
});

export default updateCategory;
export type { UpdateCategoryAction };
