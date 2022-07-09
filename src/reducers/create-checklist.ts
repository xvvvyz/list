import selectActiveProfile from '../selectors/select-active-profile';
import { Id, State } from '../types';

interface CreateChecklistAction {
  atBeginning?: boolean;
  id: Id;
  type: 'CreateChecklist';
}

const createChecklist = (state: State, action: CreateChecklistAction) => {
  const activeProfile = selectActiveProfile(state);

  const newChecklist = {
    categories: [],
    completed: [],
    id: action.id,
    tags: [],
    text: '',
  };

  const newChecklists = action.atBeginning
    ? [newChecklist.id, ...activeProfile.checklists]
    : [...activeProfile.checklists, newChecklist.id];

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
        checklists: newChecklists,
      },
    },
  };
};

export default createChecklist;
export type { CreateChecklistAction };
