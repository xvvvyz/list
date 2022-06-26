import generateId from '../utilities/generate-id';
import { IdPrefix } from '../enums';
import { State } from '../reducer';

interface CreateProfileAction {
  type: 'CreateProfile';
}

const createProfile = (state: State) => {
  const newProfile = {
    categories: [],
    checklists: [],
    id: generateId(IdPrefix.Profile),
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
