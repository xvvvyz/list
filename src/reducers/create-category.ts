import generateId from '../utilities/generate-id';
import selectActiveProfile from '../selectors/select-active-profile';
import { IdPrefix } from '../enums';
import { State } from '../reducer';

interface CreateCategoryAction {
  atIndex: number;
  text?: string;
  type: 'CreateCategory';
}

const createCategory = (state: State, action: CreateCategoryAction) => {
  const activeProfile = selectActiveProfile(state);

  const newCategory = {
    id: generateId(IdPrefix.Category),
    items: [],
    text: action.text || '',
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