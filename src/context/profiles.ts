import { createContext } from 'react';
import { Profiles } from '../types';

const ProfilesContext = createContext<{
  profiles: Profiles;
}>({
  profiles: {},
});

export default ProfilesContext;
