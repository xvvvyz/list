import { useContext } from 'react';
import ReplicacheContext from '../context/replicache';

const useReplicache = () => useContext(ReplicacheContext);

export default useReplicache;
