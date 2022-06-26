import { Id } from '../types';
import { State } from '../reducer';

interface UpdateCategoryAction {
  id: Id;
  text: string;
  type: 'UpdateCategory';
}

const updateCategory = (state: State, action: UpdateCategoryAction) => ({
  ...state,
  categories: {
    ...state.categories,
    [action.id]: {
      ...state.categories[action.id],
      text: action.text,
    },
  },
});

export default updateCategory;
export type { UpdateCategoryAction };
