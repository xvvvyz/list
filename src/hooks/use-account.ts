import { useSubscribe } from 'replicache-react';
import queries from '../queries';
import useReplicache from './use-replicache';

const useAccount = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return null;
      return (await queries.account(tx, replicache.name)) ?? null;
    },
    null,
    [replicache]
  );
};

export default useAccount;
