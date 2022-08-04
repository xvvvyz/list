import * as C from '@chakra-ui/react';
import React from 'react';
import useReplicache from '../../../../hooks/use-replicache';

const SyncingIndicator = () => {
  const { isSyncing } = useReplicache();

  return (
    <C.Center>
      <C.Box
        bg="bgSecondaryActive"
        bgGradient="linear(to-r, green.500, blue.500, purple.500, pink.500, red.500, orange.500, yellow.500)"
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
    </C.Center>
  );
};

export default SyncingIndicator;
