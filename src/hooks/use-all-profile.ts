import { useSubscribe } from 'replicache-react';
import queries from '../queries';
import useReplicache from './use-replicache';

const useAllProfile = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return [];
      return queries.allProfile(tx, { accountId: replicache.name });
    },
    [],
    [replicache]
  );
};

export default useAllProfile;
