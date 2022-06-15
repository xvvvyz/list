import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import 'focus-visible/dist/focus-visible';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import seo from '../seo';
import theme from '../theme';

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider resetCSS theme={extendTheme(theme)}>
    <DefaultSeo {...seo} />
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
