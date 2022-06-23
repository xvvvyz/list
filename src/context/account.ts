import * as T from '../types';
import React from 'react';
import { noop } from '@chakra-ui/utils';

const AccountContext = React.createContext<T.AccountContext>({
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
