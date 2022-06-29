import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import { noop } from '@chakra-ui/utils';
import theme from '../theme';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body onTouchStart={noop}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
