import { createContext } from 'react';
import { Profiles } from '../types';

const ProfilesContext = createContext<Profiles>({});

export default ProfilesContext;
