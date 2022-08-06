import React, { ReactNode, useEffect, useState } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { Replicache } from 'replicache';
import { createClient } from '@supabase/supabase-js';
import ReplicacheContext from '../../../../context/replicache';
import generateId from '../../../../utilities/generate-id';
import mutations, { Mutations } from '../../../../mutations';
import { IdSize, LocalstorageKey } from '../../../../enums';

interface ReplicacheProviderProps {
  children: ReactNode;
}

const ReplicacheProvider = ({ children }: ReplicacheProviderProps) => {
  const [replicache, setReplicache] = useState<Replicache<Mutations> | null>(null);
  const [spaceId] = useLocalStorage<string>(LocalstorageKey.SpaceId, generateId(IdSize.SpaceId));

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY || !spaceId || replicache) return;

    const r = new Replicache({
      licenseKey: process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY,
      mutators: mutations,
      name: spaceId,
      pullInterval: null,
      pullURL: `/api/replicache/pull?spaceID=${spaceId}`,
      pushURL: `/api/replicache/push?spaceID=${spaceId}`,
      schemaVersion: '1',
    });

    // TODO: add r.close.bind(r) to cleanup when React 18 is supported. it currently leads to an InvalidStateError
    const cleanup: (() => void)[] = [];

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const su = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

      su.from(`space:id=eq.${spaceId}`)
        .on('*', async () => r.pull())
        .subscribe();

      cleanup.push(su.removeAllSubscriptions.bind(su));
    } else {
      const ev = new EventSource(`/api/replicache/poke-sse?spaceID=${spaceId}`);

      ev.onmessage = (e) => {
        if (e.data === 'poke') r.pull();
      };

      cleanup.push(ev.close.bind(ev));
    }

    setReplicache(r);
    return () => cleanup.forEach((f) => f());
  }, [replicache, setReplicache, spaceId]);

  return <ReplicacheContext.Provider value={replicache}>{children}</ReplicacheContext.Provider>;
};

export default ReplicacheProvider;
