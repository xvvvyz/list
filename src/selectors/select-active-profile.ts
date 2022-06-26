import { State } from '../reducer';

const selectActiveProfile = (state: Pick<State, 'account' | 'profiles'>) => state.profiles[state.account.profiles[0]];

export default selectActiveProfile;
