import { useSubscribe } from 'replicache-react';
import useReplicache from './use-replicache';
import { profileQueries } from '../models/profile';

const useAllProfile = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return [];
      return profileQueries.allProfile(tx, { accountId: replicache.name });
    },
    [],
    [replicache]
  );
};

export default useAllProfile;
