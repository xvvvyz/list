import React, { ReactNode, useMemo } from 'react';
import { useReplicache } from 'replicache-nextjs/lib/frontend';
import ReplicacheContext from '../../../../context/replicache';
import generateId from '../../../../utilities/generate-id';
import mutations from '../../../../mutations';
import { IdSize, LocalstorageKey } from '../../../../enums';

interface ReplicacheProviderProps {
  children: ReactNode;
}

const ReplicacheProvider = ({ children }: ReplicacheProviderProps) => (
  <ReplicacheContext.Provider
    value={useReplicache(
      useMemo(() => {
        if (typeof window === 'undefined') return null;
        let spaceId = localStorage.getItem(LocalstorageKey.SpaceId);
        if (spaceId) return spaceId;
        spaceId = generateId(IdSize.SpaceId);
        localStorage.setItem(LocalstorageKey.SpaceId, spaceId);
        return spaceId;
      }, []),
      mutations
    )}
  >
    {children}
  </ReplicacheContext.Provider>
);

export default ReplicacheProvider;
