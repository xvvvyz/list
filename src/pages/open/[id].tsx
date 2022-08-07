import { deleteAllReplicacheData } from 'replicache';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import isValidSpaceId from '../../utilities/is-valid-space-id';
import { LocalstorageKey } from '../../enums';

const OpenIdPage = () => {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    void deleteAllReplicacheData();
    const spaceId = router.query.id as string;
    if (isValidSpaceId(spaceId)) localStorage.setItem(LocalstorageKey.SpaceId, spaceId);
    void router.replace('/');
  }, [router]);

  return null;
};

export default OpenIdPage;
