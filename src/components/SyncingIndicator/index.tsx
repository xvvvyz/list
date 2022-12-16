import * as C from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import useReplicache from '../../hooks/use-replicache';

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
      bgGradient="linear(to-r, green.400, blue.400, purple.400, pink.400, red.400, orange.400, yellow.400)"
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
