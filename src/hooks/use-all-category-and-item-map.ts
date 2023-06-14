import { useSubscribe } from 'replicache-react';
import { CategoryMap } from '../models/category';
import { ItemMap } from '../models/item';
import queries from '../queries';
import useReplicache from './use-replicache';

const useAllCategoryAndItemMap = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return { categoryMap: {} as CategoryMap, itemMap: {} as ItemMap, tagList: [] };
      return queries.allCategoryAndItemMap(tx, { accountId: replicache.name });
    },
    { categoryMap: {}, itemMap: {}, tagList: [] },
    [replicache]
  );
};

export default useAllCategoryAndItemMap;
