import { useSubscribe } from 'replicache-react';
import queries from '../queries';
import useReplicache from './use-replicache';

const useAllChecklist = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return [];
      return queries.allChecklist(tx, { accountId: replicache.name });
    },
    [],
    [replicache]
  );
};

export default useAllChecklist;
