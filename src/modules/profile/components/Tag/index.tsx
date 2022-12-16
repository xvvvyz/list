import * as C from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TagProps extends C.TextProps {
  children: ReactNode;
}

const Tag = ({ children, ...rest }: TagProps) => (
  <C.Text
    _after={{
      bg: 'bgTag',
      borderRadius: 'sm',
      bottom: 0,
      content: '" "',
      left: '-2px',
      pos: 'absolute',
      right: '-2px',
      shadow: 'borderPrimary',
      top: 0,
      zIndex: -1,
    }}
    as="span"
    color="fgPrimary"
    display="inline"
    pos="relative"
    verticalAlign="inherit"
    zIndex={1}
    {...rest}
  >
    {children}
  </C.Text>
);

export default Tag;
