import { useRouter } from 'next/router';
import { useSubscribe } from 'replicache-react';
import queries from '../queries';
import useReplicache from './use-replicache';

const useActiveChecklist = () => {
  const replicache = useReplicache();
  const router = useRouter();

  return useSubscribe(
    replicache,
    async (tx) => {
      if (!replicache || typeof router.query.id !== 'string') return null;
      return (await queries.checklistDenormalized(tx, { accountId: replicache.name, id: router.query.id })) ?? null;
    },
    null,
    [router.query.id, replicache]
  );
};

export default useActiveChecklist;
