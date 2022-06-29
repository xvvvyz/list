import generateId from '../utilities/generate-id';
import selectActiveProfile from '../selectors/select-active-profile';
import { IdPrefix } from '../enums';
import { State } from '../reducer';

interface CreateChecklistAction {
  atBeginning?: boolean;
  type: 'CreateChecklist';
}

const createChecklist = (state: State, action: CreateChecklistAction) => {
  const activeProfile = selectActiveProfile(state);

  const newChecklist = {
    categories: [],
    completed: [],
    id: generateId(IdPrefix.Checklist),
    meta: { autoFocus: true },
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
