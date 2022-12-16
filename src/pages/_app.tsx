import { ChakraProvider } from '@chakra-ui/provider';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import { NextPage } from 'next';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import seo from '../seo';
import theme from '../theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => (
  <>
    <DefaultSeo {...seo} />
    <ChakraProvider resetCSS theme={theme}>
      {(Component.getLayout ?? ((page) => page))(<Component {...pageProps} />)}
    </ChakraProvider>
  </>
);

export default App;
export type { NextPageWithLayout };
