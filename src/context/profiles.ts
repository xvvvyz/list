import { createContext } from 'react';
import { Profiles } from '../types';

const profilesInitialState = {};
const ProfilesContext = createContext<Profiles>(profilesInitialState);

export default ProfilesContext;
export { profilesInitialState };
