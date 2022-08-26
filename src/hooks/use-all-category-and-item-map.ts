import { useSubscribe } from 'replicache-react';
import queries from '../queries';
import useReplicache from './use-replicache';

const useAllCategoryAndItemMap = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return { categoryMap: {}, itemMap: {}, tagList: [] };
      return queries.allCategoryAndItemMap(tx, { accountId: replicache.name });
    },
    { categoryMap: {}, itemMap: {}, tagList: [] },
    [replicache]
  );
};

export default useAllCategoryAndItemMap;
