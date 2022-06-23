import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import 'focus-visible/dist/focus-visible';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import * as T from '../types';
import AccountContext from '../context/account';
import React, { useState } from 'react';
import mockData from '../data/mock-data';
import parseProfiles from '../utilities/parse-profiles';
import seo from '../seo';
import theme from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  const [categories, setCategories] = useState<T.Categories>(mockData.categories);
  const [checklists, setChecklists] = useState<T.Checklists>(mockData.checklists);
  const [items, setItems] = useState<T.Items>(mockData.items);
  const [profiles, setProfiles] = useState<T.Profiles>(mockData.profiles);
  const [user, setUser] = useState<T.User>(mockData.user);

  const parsed = parseProfiles({
    categories,
    checklists,
    items,
    profiles,
    user,
  });

  return (
    <ChakraProvider resetCSS theme={extendTheme(theme)}>
      <AccountContext.Provider
        value={{
          activeProfile: parsed[0] || null,
          categories,
          checklists,
          items,
          parsed,
          profiles,
          setCategories,
          setChecklists,
          setItems,
          setProfiles,
          setUser,
          user,
        }}
      >
        <DefaultSeo {...seo} />
        <Component {...pageProps} />
      </AccountContext.Provider>
    </ChakraProvider>
  );
};

export default App;
