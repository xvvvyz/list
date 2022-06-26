import { createContext } from 'react';
import { Account } from '../types';

const AccountContext = createContext<{
  account: Account;
}>({
  account: { id: '', profiles: [] },
});

export default AccountContext;
