import { Id } from '../types';
import { State } from '../reducer';

interface UpdateChecklistAction {
  id: Id;
  text: string;
  type: 'UpdateChecklist';
}

const updateChecklist = (state: State, action: UpdateChecklistAction) => ({
  ...state,
  checklists: {
    ...state.checklists,
    [action.id]: {
      ...state.checklists[action.id],
      text: action.text,
    },
  },
});

export default updateChecklist;
export type { UpdateChecklistAction };
