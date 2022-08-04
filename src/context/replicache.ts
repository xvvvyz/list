import { Replicache } from 'replicache';
import { createContext } from 'react';
import { Mutations } from '../mutations';

const ReplicacheContext = createContext<{ isSyncing: boolean; replicache: Replicache<Mutations> | null }>({
  isSyncing: false,
  replicache: null,
});

export default ReplicacheContext;
