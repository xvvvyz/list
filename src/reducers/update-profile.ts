import { Id, State } from '../types';

interface UpdateProfileAction {
  id: Id;
  text: string;
  type: 'UpdateProfile';
}

const updateProfile = (state: State, action: UpdateProfileAction) => ({
  ...state,
  profiles: {
    ...state.profiles,
    [action.id]: {
      ...state.profiles[action.id],
      text: action.text,
    },
  },
});

export default updateProfile;
export type { UpdateProfileAction };
