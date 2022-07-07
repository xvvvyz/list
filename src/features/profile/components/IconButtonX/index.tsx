import * as C from '@chakra-ui/react';
import React from 'react';
import X from '../../../../images/x.svg';

const IconButtonX = (props: C.IconButtonProps) => (
  <C.IconButton boxSize={10} display="none" flexShrink={0} icon={<C.Icon as={X} boxSize={6} />} zIndex={1} {...props} />
);

export default IconButtonX;
