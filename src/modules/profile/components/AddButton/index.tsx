import * as C from '@chakra-ui/react';
import Plus from '../../../../images/plus.svg';

const AddButton = (props: C.ButtonProps) => (
  <C.Button
    iconSpacing={6}
    justifyContent="flex-start"
    leftIcon={<C.Icon as={Plus} boxSize={6} />}
    pl={4}
    pr={5}
    w="full"
    {...props}
  />
);

export default AddButton;
