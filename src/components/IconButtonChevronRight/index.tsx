import * as C from '@chakra-ui/react';
import React from 'react';
import ChevronRight from '../../images/chevron-right.svg';

const IconButtonChevronRight = ({ label, ...rest }) => (
  <C.IconButton
    aria-label={label}
    flexShrink={0}
    icon={<C.Icon as={ChevronRight} boxSize={6} />}
    variant="ghost"
    w={14}
    {...rest}
  />
);

export default IconButtonChevronRight;
