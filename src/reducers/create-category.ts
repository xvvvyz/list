import selectActiveProfile from '../selectors/select-active-profile';
import { Id, State } from '../types';

interface CreateCategoryAction {
  atIndex: number;
  id: Id;
  text?: string;
  type: 'CreateCategory';
}

const createCategory = (state: State, action: CreateCategoryAction) => {
  const activeProfile = selectActiveProfile(state);

  const newCategory = {
    id: action.id,
    items: [],
    text: action.text ?? '',
  };

  return {
    ...state,
    categories: {
      ...state.categories,
      [newCategory.id]: newCategory,
    },
    profiles: {
      ...state.profiles,
      [activeProfile.id]: {
        ...activeProfile,
        categories: [
          ...activeProfile.categories.slice(0, action.atIndex),
          newCategory.id,
          ...activeProfile.categories.slice(action.atIndex),
        ],
      },
    },
  };
};

export default createCategory;
export type { CreateCategoryAction };
