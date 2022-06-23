import * as C from '@chakra-ui/react';
import React from 'react';
import X from '../../images/x.svg';

const IconButtonX = (props: C.IconButtonProps) => (
  <C.IconButton
    boxSize={10}
    flexShrink={0}
    icon={<C.Icon as={X} boxSize={6} />}
    opacity={0}
    variant="ghost"
    {...props}
  />
);

export default IconButtonX;