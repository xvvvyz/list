import { useSubscribe } from 'replicache-react';
import queries from '../queries';
import useReplicache from './use-replicache';

const useAllCategoryItemTagMap = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return { categoryMap: {}, itemMap: {}, tagList: [] };
      return queries.allCategoryItemTagMap(tx, { accountId: replicache.name });
    },
    { categoryMap: {}, itemMap: {}, tagList: [] },
    [replicache]
  );
};

export default useAllCategoryItemTagMap;
