import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Replicache } from 'replicache';
import { createClient } from '@supabase/supabase-js';
import { useLocalStorage } from 'react-use';
import ReplicacheContext from '../context/replicache';
import mutations, { Mutations } from '../mutations';
import { NextPageWithLayout } from '../pages/_app';
import { accountQueries } from '../models/account';

interface ReplicacheProviderProps {
  children: ReactNode;
}

const ReplicacheProvider = ({ children }: ReplicacheProviderProps) => {
  const [replicache, setReplicache] = useState<Replicache<Mutations> | null>(null);
  const [spaceId, setSpaceId] = useLocalStorage('space-id', '');

  useEffect(() => {
    (async () => {
      if (spaceId) return;
      const req = await fetch('/api/create-space', { method: 'POST' });
      const res = await req.json();
      setSpaceId(res.spaceId);
    })();
  }, []);

  useEffect(() => {
    if (replicache || !spaceId) return;

    const newReplicache = new Replicache({
      licenseKey: process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY ?? '',
      logLevel: 'error',
      mutators: mutations,
      name: spaceId,
      pullInterval: null,
      pullURL: `/api/pull?spaceId=${spaceId}`,
      pushURL: `/api/push?spaceId=${spaceId}`,
      schemaVersion: '1',
    });

    createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)
      .from(`spaces:id=eq.${spaceId}`)
      .on('*', () => newReplicache.pull())
      .subscribe();

    setReplicache(newReplicache);

    return () => {
      (async () => {
        await newReplicache.close();
      })();
    };
  }, [spaceId]);

  useEffect(() => {
    (async () => {
      if (!replicache) return;
      const account = await replicache.query((tx) => accountQueries.account(tx, replicache.name));
      if (account) return;
      await replicache.mutate.createAccount(replicache.name);
    })();
  }, [replicache]);

  return <ReplicacheContext.Provider value={replicache}>{children}</ReplicacheContext.Provider>;
};

const withReplicache = (Page: NextPageWithLayout) => {
  Page.getLayout = (children: ReactElement) => <ReplicacheProvider>{children}</ReplicacheProvider>;
  return Page;
};

export default withReplicache;
