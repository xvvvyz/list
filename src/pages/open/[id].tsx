import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { deleteAllReplicacheData } from 'replicache';
import { LocalstorageKey } from '../../enums';
import isValidSpaceId from '../../utilities/is-valid-space-id';

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
