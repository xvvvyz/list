import * as C from '@chakra-ui/react';
import { ReactElement } from 'react';
import ReplicacheProvider from '../components/ReplicacheProvider';
import SyncingIndicator from '../components/SyncingIndicator';
import { NextPageWithLayout } from '../pages/_app';

const app = (Page: NextPageWithLayout) => {
  Page.getLayout = (children: ReactElement) => (
    <ReplicacheProvider>
      <C.Container as="div" layerStyle="app" maxW="container.lg" pb={24} px={0}>
        <SyncingIndicator />
        {children}
      </C.Container>
    </ReplicacheProvider>
  );

  return Page;
};

export default app;
