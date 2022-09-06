import * as C from '@chakra-ui/react';
import React from 'react';
import ChevronDown from '../../images/chevron-down.svg';

interface ButtonChevronExpandProps extends Omit<C.IconButtonProps, 'aria-label'> {
  children?: React.ReactNode;
  isToggled?: boolean;
  onToggle?: () => void;
}

const ButtonChevronExpand = ({ children, isToggled, onToggle, ...rest }: ButtonChevronExpandProps) => {
  const icon = <C.Icon as={ChevronDown} boxSize={6} transform={isToggled ? 'rotate(-180deg)' : 'none'} />;

  return children ? (
    <C.Button
      justifyContent="space-between"
      onClick={onToggle}
      px={5}
      rightIcon={icon}
      textAlign="left"
      w="full"
      whiteSpace="break-spaces"
      {...rest}
    >
      {children}
    </C.Button>
  ) : (
    <C.IconButton
      aria-label={isToggled ? 'show less' : 'show more'}
      flexShrink={0}
      h={14}
      icon={icon}
      onClick={onToggle}
      w={14}
      {...rest}
    />
  );
};

export default ButtonChevronExpand;
