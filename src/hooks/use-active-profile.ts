import { useSubscribe } from 'replicache-react';
import useReplicache from './use-replicache';
import { profileQueries } from '../models/profile';

const useActiveProfile = () => {
  const replicache = useReplicache();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache) return null;
      return (await profileQueries.activeProfile(tx, { accountId: replicache.name })) ?? null;
    },
    null,
    [replicache]
  );
};

export default useActiveProfile;
