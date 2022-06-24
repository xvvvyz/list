import * as C from '@chakra-ui/react';
import React from 'react';
import ChevronRight from '../../images/chevron-right.svg';

const IconButtonChevronRight = (props: C.IconButtonProps) => (
  <C.IconButton flexShrink={0} h={14} icon={<C.Icon as={ChevronRight} boxSize={6} />} w={14} {...props} />
);

export default IconButtonChevronRight;
