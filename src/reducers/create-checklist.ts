import generateId from '../utilities/generate-id';
import selectActiveProfile from '../selectors/select-active-profile';
import { IdPrefix } from '../enums';
import { State } from '../reducer';

interface CreateChecklistAction {
  type: 'CreateChecklist';
}

const createChecklist = (state: State) => {
  const activeProfile = selectActiveProfile(state);

  const newChecklist = {
    categories: [],
    completed: [],
    id: generateId(IdPrefix.Checklist),
    tags: [],
    text: '',
  };

  return {
    ...state,
    checklists: {
      ...state.checklists,
      [newChecklist.id]: newChecklist,
    },
    profiles: {
      ...state.profiles,
      [activeProfile.id]: {
        ...activeProfile,
        checklists: [...activeProfile.checklists, newChecklist.id],
      },
    },
  };
};

export default createChecklist;
export type { CreateChecklistAction };
