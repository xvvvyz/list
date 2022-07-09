import { arrayMove } from '@dnd-kit/sortable';
import selectActiveProfile from '../selectors/select-active-profile';
import { State } from '../types';

interface ReorderCategoryAction {
  fromIndex: number;
  toIndex: number;
  type: 'ReorderCategory';
}

const reorderCategory = (state: State, action: ReorderCategoryAction) => {
  const activeProfile = selectActiveProfile(state);

  return {
    ...state,
    profiles: {
      ...state.profiles,
      [activeProfile.id]: {
        ...activeProfile,
        categories: arrayMove(activeProfile.categories, action.fromIndex, action.toIndex),
      },
    },
  };
};

export default reorderCategory;
export type { ReorderCategoryAction };
