import selectActiveProfile from '../selectors/select-active-profile';
import { Id } from '../types';
import { State } from '../reducer';

interface DeleteCategoryAction {
  id: Id;
  type: 'DeleteCategory';
}

const deleteCategory = (state: State, action: DeleteCategoryAction) => {
  const activeProfile = selectActiveProfile(state);

  return {
    ...state,
    profiles: {
      ...state.profiles,
      [activeProfile.id]: {
        ...activeProfile,
        categories: activeProfile.categories.filter((id) => id !== action.id),
      },
    },
  };
};

export default deleteCategory;
export type { DeleteCategoryAction };
