import React, { ReactNode, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { useReplicache } from 'replicache-nextjs/lib/frontend';
import { useRouter } from 'next/router';
import ReplicacheContext from '../../../../context/replicache';
import mutations from '../../../../mutations';
import { LOCALSTORAGE_KEY } from '../../../../enums';

interface ReplicacheProviderProps {
  children: ReactNode;
}

const ReplicacheProvider = ({ children }: ReplicacheProviderProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [spaceId] = useLocalStorage<string>(LOCALSTORAGE_KEY.SPACE_ID);
  const replicache = useReplicache(spaceId, mutations);
  const { replace } = useRouter();

  useEffect(() => {
    (async () => {
      if (spaceId) return;
      await replace('/open/new-space');
    })();
  }, [replace, spaceId]);

  useEffect(() => {
    if (!replicache) return;
    const setIsNotSyncing = debounce(() => setIsSyncing(false), 500);
    replicache.onSync = (isSyncing) => (isSyncing ? setIsSyncing(true) : setIsNotSyncing());
  }, [replicache, setIsSyncing]);

  return <ReplicacheContext.Provider value={{ isSyncing, replicache }}>{children}</ReplicacheContext.Provider>;
};

export default ReplicacheProvider;
