import { arrayMove } from '@dnd-kit/sortable';
import { Id } from '../types';
import { State } from '../reducer';

interface SetActiveProfileAction {
  id: Id;
  type: 'SetActiveProfile';
}

const setActiveProfile = (state: State, action: SetActiveProfileAction) => ({
  ...state,
  account: {
    ...state.account,
    profiles: arrayMove(state.account.profiles, state.account.profiles.indexOf(action.id), 0),
  },
});

export default setActiveProfile;
export type { SetActiveProfileAction };
