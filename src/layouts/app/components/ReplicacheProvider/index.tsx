import React, { ReactNode, useEffect } from 'react';
import noop from 'lodash/noop';
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
  const [spaceId] = useLocalStorage<string>(LOCALSTORAGE_KEY.SPACE_ID);
  const replicache = useReplicache(spaceId, mutations);
  const { replace } = useRouter();

  useEffect(() => {
    if (spaceId) return;
    replace('/open/new-space').then(noop);
  }, [replace, spaceId]);

  return <ReplicacheContext.Provider value={replicache}>{children}</ReplicacheContext.Provider>;
};

export default ReplicacheProvider;
