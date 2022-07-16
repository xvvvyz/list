import * as C from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useLocalStorage } from 'react-use';
import { useRouter } from 'next/router';
import transact from '../../database/transact';
import { getCookie } from '../../database/queries';

interface OpenIdPageProps {
  spaceId: string;
}

const OpenIdPage = ({ spaceId }: OpenIdPageProps) => {
  const router = useRouter();
  const [, setSpaceId] = useLocalStorage('space-id', '');

  useEffect(() => {
    (async () => {
      if (spaceId) setSpaceId(spaceId);
      await router.replace('/');
    })();
  }, [router, setSpaceId, spaceId]);

  return (
    <C.Center h="100vh">
      <C.Text>restoring backup&hellip;</C.Text>
    </C.Center>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const spaceId = context.params?.id;
  const redirect = { redirect: { destination: '/', permanent: false } };
  if (typeof spaceId !== 'string') return redirect;
  const cookie = await transact((e) => getCookie(e, spaceId));
  if (!cookie) return redirect;
  return { props: { spaceId } };
};

export default OpenIdPage;
export { getServerSideProps };
