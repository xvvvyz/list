import { useSubscribe } from 'replicache-react';
import useReplicache from './use-replicache';
import { categoryQueries } from '../models/category';

const useAllCategoryMap = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return {};
      return categoryQueries.allCategoryMap(tx, { accountId: replicache.name });
    },
    {},
    [replicache]
  );
};

export default useAllCategoryMap;
