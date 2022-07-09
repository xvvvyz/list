import { createContext } from 'react';
import generateId from '../utilities/generate-id';
import { Account } from '../types';

const accountInitialState = { id: generateId(), profiles: [] };
const AccountContext = createContext<Account>(accountInitialState);

export default AccountContext;
export { accountInitialState };
