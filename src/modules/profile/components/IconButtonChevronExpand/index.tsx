import * as C from '@chakra-ui/react';
import React from 'react';
import ChevronDown from '../../../../images/chevron-down.svg';

interface IconButtonChevronExpandProps extends Omit<C.IconButtonProps, 'aria-label'> {
  isToggled?: boolean;
  onToggle?: () => void;
}

const IconButtonChevronExpand = ({ isToggled, onToggle, ...rest }: IconButtonChevronExpandProps) => (
  <C.IconButton
    aria-label={isToggled ? 'show less' : 'show more'}
    flexShrink={0}
    h={14}
    icon={<C.Icon as={ChevronDown} boxSize={6} transform={isToggled ? 'rotate(-180deg)' : 'none'} />}
    onClick={onToggle}
    w={14}
    {...rest}
  />
);

export default IconButtonChevronExpand;
