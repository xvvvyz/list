import { useSubscribe } from 'replicache-react';
import useReplicache from './use-replicache';
import { itemQueries } from '../models/item';

const useAllItemMap = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return {};
      return itemQueries.allItemMap(tx, { accountId: replicache.name });
    },
    {},
    [replicache]
  );
};

export default useAllItemMap;
