import * as C from '@chakra-ui/react';
import X from '../../../../images/x.svg';

const IconButtonX = (props: C.IconButtonProps) => (
  <C.IconButton
    boxSize={10}
    flexShrink={0}
    icon={<C.Icon as={X} boxSize={6} />}
    visibility="hidden"
    zIndex={1}
    {...props}
  />
);

export default IconButtonX;
