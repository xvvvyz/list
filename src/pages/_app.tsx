import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import React, { useReducer } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/provider';
import { DefaultSeo } from 'next-seo';
import AccountContext from '../context/account';
import ApiContext from '../context/api';
import CategoriesContext from '../context/categories';
import ChecklistsContext from '../context/checklists';
import ItemsContext from '../context/items';
import ProfilesContext from '../context/profiles';
import mockData from '../data/mock-data';
import reducer from '../reducer';
import seo from '../seo';
import theme from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  const [{ account, categories, checklists, items, profiles }, dispatch] = useReducer(reducer, mockData);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ApiContext.Provider value={{ dispatch }}>
        <AccountContext.Provider value={{ account }}>
          <ProfilesContext.Provider value={{ profiles }}>
            <ChecklistsContext.Provider value={{ checklists }}>
              <CategoriesContext.Provider value={{ categories }}>
                <ItemsContext.Provider value={{ items }}>
                  <DefaultSeo {...seo} />
                  <Component {...pageProps} />
                </ItemsContext.Provider>
              </CategoriesContext.Provider>
            </ChecklistsContext.Provider>
          </ProfilesContext.Provider>
        </AccountContext.Provider>
      </ApiContext.Provider>
    </ChakraProvider>
  );
};

export default App;
