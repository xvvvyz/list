import * as C from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import useReplicache from '../../../../hooks/use-replicache';

const SyncingIndicator = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const replicache = useReplicache();

  useEffect(() => {
    if (!replicache || replicache.onSync) return;

    replicache.onSync = (isSyncing) => {
      if (isSyncing) setIsSyncing(true);
      else debounce(() => setIsSyncing(false), 500)();
    };
  }, [replicache, setIsSyncing]);

  return (
    <C.Box
      bg="bgSecondaryActive"
      bgGradient="linear(to-r, green.500, blue.500, purple.500, pink.500, red.500, orange.500, yellow.500)"
      borderBottomRadius="md"
      h={2}
      maxW="container.lg"
      opacity={isSyncing ? '1' : '0.5'}
      pos="fixed"
      shadow="xl"
      top={0}
      transitionDuration="normal"
      transitionProperty="opacity"
      w="full"
      zIndex={2}
    />
  );
};

export default SyncingIndicator;
