import { deleteAllReplicacheData } from 'replicache';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import isValidSpaceId from '../../utilities/is-valid-space-id';
import { LocalstorageKey } from '../../enums';

const OpenIdPage = () => {
  const router = useRouter();
  const ran = useRef(false);
  const spaceId = router.query.id;

  useEffect(() => {
    if (typeof spaceId !== 'string' || ran.current) return;
    ran.current = true;
    void deleteAllReplicacheData();
    if (isValidSpaceId(spaceId)) localStorage.setItem(LocalstorageKey.SpaceId, spaceId);
    void router.replace('/');
  }, [router, spaceId]);

  return null;
};

export default OpenIdPage;
