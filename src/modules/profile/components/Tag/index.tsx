import * as C from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
}

const Tag = ({ children }: TagProps) => (
  <C.Text
    as="span"
    sx={{
      _after: {
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
      },
      color: 'fgPrimary',
      display: 'inline',
      pos: 'relative',
      verticalAlign: 'inherit',
      zIndex: 1,
    }}
  >
    {children}
  </C.Text>
);

export default Tag;
