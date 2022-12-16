import { createContext } from 'react';
import { Replicache } from 'replicache';
import { Mutations } from '../mutations';

const ReplicacheContext = createContext<Replicache<Mutations> | null>(null);

export default ReplicacheContext;
