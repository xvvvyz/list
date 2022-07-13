import { useSubscribe } from 'replicache-react';
import useReplicache from './use-replicache';
import { checklistQueries } from '../models/checklist';

const useAllChecklistDenormalized = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return [];
      return checklistQueries.allChecklistDenormalized(tx, { accountId: replicache.name });
    },
    [],
    [replicache]
  );
};

export default useAllChecklistDenormalized;
