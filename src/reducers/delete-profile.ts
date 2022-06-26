import { Id } from '../types';
import { State } from '../reducer';

interface DeleteProfileAction {
  id: Id;
  type: 'DeleteProfile';
}

const deleteProfile = (state: State, action: DeleteProfileAction) => ({
  ...state,
  account: {
    ...state.account,
    profiles: state.account.profiles.filter((id) => id !== action.id),
  },
});

export default deleteProfile;
export type { DeleteProfileAction };
