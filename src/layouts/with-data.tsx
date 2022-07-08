import React, { ReactElement, ReactNode, useReducer } from 'react';
import AccountContext from '../context/account';
import CategoriesContext from '../context/categories';
import ChecklistsContext from '../context/checklists';
import DispatchContext from '../context/dispatch';
import ItemsContext from '../context/items';
import ProfilesContext from '../context/profiles';
import mockData from '../data/mock-data';
import reducer from '../reducer';
import { NextPageWithLayout } from '../pages/_app';

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {
  const [{ account, categories, checklists, items, profiles }, dispatch] = useReducer(reducer, mockData);

  return (
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
  );
};

const withData = (Page: NextPageWithLayout) => {
  Page.getLayout = (children: ReactElement) => <DataProvider>{children}</DataProvider>;
  return Page;
};

export default withData;
