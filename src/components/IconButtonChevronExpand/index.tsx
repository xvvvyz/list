import * as C from '@chakra-ui/react';
import React from 'react';
import ChevronDown from '../../images/chevron-down.svg';

const IconButtonChevronExpand = ({ isToggled, label, onToggle, ...rest }) => (
  <C.IconButton
    aria-label={label}
    flexShrink={0}
    h={14}
    icon={
      <C.Icon
        as={ChevronDown}
        boxSize={6}
        transform={isToggled ? 'rotate(-180deg)' : 'none'}
      />
    }
    onClick={onToggle}
    variant="ghost"
    w={14}
    {...rest}
  />
);

export default IconButtonChevronExpand;
