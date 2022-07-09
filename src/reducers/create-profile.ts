import { Id, State } from '../types';

interface CreateProfileAction {
  id: Id;
  type: 'CreateProfile';
}

const createProfile = (state: State, action: CreateProfileAction) => {
  const newProfile = {
    categories: [],
    checklists: [],
    id: action.id,
    tags: {},
    text: '',
  };

  return {
    ...state,
    account: {
      ...state.account,
      profiles: [...state.account.profiles, newProfile.id],
    },
    profiles: {
      ...state.profiles,
      [newProfile.id]: newProfile,
    },
  };
};

export default createProfile;
export type { CreateProfileAction };
