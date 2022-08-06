import { useSubscribe } from 'replicache-react';
import queries from '../queries';
import useReplicache from './use-replicache';

const useActiveProfile = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return null;
      return (await queries.activeProfile(tx, { accountId: replicache.name })) ?? null;
    },
    null,
    [replicache]
  );
};

export default useActiveProfile;
