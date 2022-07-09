import React, { ReactElement, ReactNode, useEffect, useReducer } from 'react';
import { entries } from 'idb-keyval';
import AccountContext, { accountInitialState } from '../context/account';
import CategoriesContext, { categoriesInitialState } from '../context/categories';
import ChecklistsContext, { checklistsInitialState } from '../context/checklists';
import DispatchContext from '../context/dispatch';
import ItemsContext, { itemsInitialState } from '../context/items';
import ProfilesContext, { profilesInitialState } from '../context/profiles';
import StatusContext, { statusInitialState } from '../context/status';
import reducer from '../reducer';
import useIdbSync from '../utilities/use-idb-sync';
import { NextPageWithLayout } from '../pages/_app';

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {
  const [{ account, categories, checklists, items, profiles, status }, dispatch] = useReducer(reducer, {
    account: accountInitialState,
    categories: categoriesInitialState,
    checklists: checklistsInitialState,
    items: itemsInitialState,
    profiles: profilesInitialState,
    status: statusInitialState,
  });

  useEffect(() => {
    entries().then((e) => {
      dispatch({ state: Object.fromEntries(e), type: 'Initialize' });
    });
  }, []);

  useIdbSync({ key: 'account', skip: status.isLoading, value: account });
  useIdbSync({ key: 'categories', skip: status.isLoading, value: categories });
  useIdbSync({ key: 'checklists', skip: status.isLoading, value: checklists });
  useIdbSync({ key: 'items', skip: status.isLoading, value: items });
  useIdbSync({ key: 'profiles', skip: status.isLoading, value: profiles });

  return (
    <StatusContext.Provider value={status}>
      <DispatchContext.Provider value={dispatch}>
        <AccountContext.Provider value={account}>
          <ProfilesContext.Provider value={profiles}>
            <ChecklistsContext.Provider value={checklists}>
              <CategoriesContext.Provider value={categories}>
                <ItemsContext.Provider value={items}>{children}</ItemsContext.Provider>
              </CategoriesContext.Provider>
            </ChecklistsContext.Provider>
          </ProfilesContext.Provider>
        </AccountContext.Provider>
      </DispatchContext.Provider>
    </StatusContext.Provider>
  );
};

const withData = (Page: NextPageWithLayout) => {
  Page.getLayout = (children: ReactElement) => <DataProvider>{children}</DataProvider>;
  return Page;
};

export default withData;
