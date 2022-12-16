import { ReactNode } from 'react';
import { useReplicache } from 'replicache-nextjs/lib/frontend';
import ReplicacheContext from '../../context/replicache';
import { IdSize, LocalstorageKey } from '../../enums';
import mutations from '../../mutations';
import generateId from '../../utilities/generate-id';

const getSpaceId = () => {
  if (typeof window === 'undefined') return;
  let spaceId = localStorage.getItem(LocalstorageKey.SpaceId);
  if (spaceId) return spaceId;
  spaceId = generateId(IdSize.SpaceId);
  localStorage.setItem(LocalstorageKey.SpaceId, spaceId);
  return spaceId;
};

interface ReplicacheProviderProps {
  children: ReactNode;
}

const ReplicacheProvider = ({ children }: ReplicacheProviderProps) => (
  <ReplicacheContext.Provider
    value={useReplicache({
      mutators: mutations,
      name: getSpaceId(),
      pullInterval: null,
      schemaVersion: '2',
    })}
  >
    {children}
  </ReplicacheContext.Provider>
);

export default ReplicacheProvider;
