import { useSubscribe } from 'replicache-react';
import queries from '../queries';
import useReplicache from './use-replicache';

const useAllChecklistDenormalized = () => {
  const { replicache } = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return [];
      return queries.allChecklistDenormalized(tx, { accountId: replicache.name });
    },
    [],
    [replicache]
  );
};

export default useAllChecklistDenormalized;
