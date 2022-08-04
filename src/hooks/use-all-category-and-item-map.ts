import { useSubscribe } from 'replicache-react';
import queries from '../queries';
import useReplicache from './use-replicache';

const useAllCategoryAndItemMap = () => {
  const { replicache } = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return { categoryMap: {}, itemMap: {} };
      return queries.allCategoryAndItemMap(tx, { accountId: replicache.name });
    },
    { categoryMap: {}, itemMap: {} },
    [replicache]
  );
};

export default useAllCategoryAndItemMap;
