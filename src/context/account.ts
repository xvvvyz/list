import { createContext } from 'react';
import { Account } from '../types';

const AccountContext = createContext<Account>({ id: '', profiles: [] });

export default AccountContext;
