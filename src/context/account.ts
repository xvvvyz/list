import React from 'react';
import { noop } from '@chakra-ui/utils';
import * as T from '../types';

interface AccountContextValues extends T.Account {
  activeProfile: T.ProfileParsed | null;
  parsed: T.ProfileParsed[];
  setCategories: T.ReactSetState<T.Categories>;
  setChecklists: T.ReactSetState<T.Checklists>;
  setItems: T.ReactSetState<T.Items>;
  setProfiles: T.ReactSetState<T.Profiles>;
  setUser: T.ReactSetState<T.User>;
}

const AccountContext = React.createContext<AccountContextValues>({
  activeProfile: null,
  categories: {},
  checklists: {},
  items: {},
  parsed: [],
  profiles: {},
  setCategories: noop,
  setChecklists: noop,
  setItems: noop,
  setProfiles: noop,
  setUser: noop,
  user: { id: '', profiles: [] },
});

export default AccountContext;
