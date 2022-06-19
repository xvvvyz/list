import * as C from '@chakra-ui/react';
import React from 'react';
import Plus from '../../images/plus.svg';

const AddButton = ({ children, ...rest }) => (
  <C.Button
    h={14}
    iconSpacing={6}
    justifyContent="flex-start"
    leftIcon={<C.Icon as={Plus} boxSize={6} />}
    pl={4}
    pr={5}
    variant="ghost"
    w="full"
    {...rest}
  >
    {children}
  </C.Button>
);

export default AddButton;
