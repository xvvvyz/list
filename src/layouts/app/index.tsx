import React, { ReactElement } from 'react';
import AppContainer from './components/AppContainer';
import ReplicacheProvider from './components/ReplicacheProvider';
import SyncingIndicator from './components/SyncingIndicator';
import { NextPageWithLayout } from '../../pages/_app';

const app = (Page: NextPageWithLayout) => {
  Page.getLayout = (children: ReactElement) => (
    <ReplicacheProvider>
      <AppContainer>
        <SyncingIndicator />
        {children}
      </AppContainer>
    </ReplicacheProvider>
  );

  return Page;
};

export default app;
