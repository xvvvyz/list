import * as C from '@chakra-ui/react';
import React from 'react';
import X from '../../../../images/x.svg';

const IconButtonX = ({ className, label, ...rest }) => (
  <C.IconButton
    aria-label={label}
    boxSize={10}
    className={className}
    flexShrink={0}
    icon={<C.Icon as={X} boxSize={6} />}
    opacity={0}
    variant="ghost"
    {...rest}
  />
);

export default IconButtonX;
