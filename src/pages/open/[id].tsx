import useLocalStorage from 'react-use/lib/useLocalStorage';
import { deleteAllReplicacheData } from 'replicache';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import isValidSpaceId from '../../utilities/is-valid-space-id';
import { LocalstorageKey } from '../../enums';

const OpenIdPage = () => {
  const [, setSpaceId] = useLocalStorage<string>(LocalstorageKey.SpaceId);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      await deleteAllReplicacheData();
      if (isValidSpaceId(query.id)) setSpaceId(query.id as string);
      location.replace('/');
    })();
  }, [setSpaceId, query]);

  return null;
};

export default OpenIdPage;
