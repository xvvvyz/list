import React, { ReactElement, ReactNode, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { useReplicache } from 'replicache-nextjs/lib/frontend';
import ReplicacheContext from '../context/replicache';
import mutations from '../mutations';
import { LOCALSTORAGE_KEY } from '../enums';
import { NextPageWithLayout } from '../pages/_app';

interface ReplicacheProviderProps {
  children: ReactNode;
}

const ReplicacheProvider = ({ children }: ReplicacheProviderProps) => {
  const [spaceId] = useLocalStorage<string>(LOCALSTORAGE_KEY.SPACE_ID);
  const replicache = useReplicache(spaceId, mutations);

  useEffect(() => {
    (async () => {
      if (spaceId) return;
      location.replace('/');
    })();
  }, [spaceId]);

  return <ReplicacheContext.Provider value={replicache}>{children}</ReplicacheContext.Provider>;
};

const withReplicache = (Page: NextPageWithLayout) => {
  Page.getLayout = (children: ReactElement) => <ReplicacheProvider>{children}</ReplicacheProvider>;
  return Page;
};

export default withReplicache;
