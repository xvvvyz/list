import generateId from '../utilities/generate-id';
import { State } from '../reducer';

interface CreateProfileAction {
  type: 'CreateProfile';
}

const createProfile = (state: State) => {
  const newProfile = {
    categories: [],
    checklists: [],
    id: generateId(),
    meta: { autoFocus: true },
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
