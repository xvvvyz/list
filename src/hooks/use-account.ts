import { useSubscribe } from 'replicache-react';
import useReplicache from './use-replicache';
import { accountQueries } from '../models/account';

const useAccount = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return null;
      return (await accountQueries.account(tx, replicache.name)) ?? null;
    },
    null,
    [replicache]
  );
};

export default useAccount;
