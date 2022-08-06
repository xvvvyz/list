import { Replicache } from 'replicache';
import { createContext } from 'react';
import { Mutations } from '../mutations';

const ReplicacheContext = createContext<Replicache<Mutations> | null>(null);

export default ReplicacheContext;
