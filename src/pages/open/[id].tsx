import { GetServerSideProps } from 'next';
import { createSpace, spaceExists } from 'replicache-nextjs/lib/backend';
import { deleteAllReplicacheData } from 'replicache';
import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { useRouter } from 'next/router';
import generateId from '../../utilities/generate-id';
import { LOCALSTORAGE_KEY } from '../../enums';

interface OpenIdPageProps {
  spaceId: string;
}

const OpenIdPage = ({ spaceId }: OpenIdPageProps) => {
  const [, setSpaceId] = useLocalStorage<string>(LOCALSTORAGE_KEY.SPACE_ID);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await deleteAllReplicacheData();
      setSpaceId(spaceId);
      await router.replace('/');
    })();
  }, [router, setSpaceId, spaceId]);

  return null;
};

const getServerSideProps: GetServerSideProps = async (context) => {
  let spaceId = context.params?.id;

  if (typeof spaceId !== 'string' || !(await spaceExists(spaceId))) {
    spaceId = generateId(32);
    await createSpace(spaceId);
  }

  return { props: { spaceId } };
};

export default OpenIdPage;
export { getServerSideProps };
