import * as C from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface InformationComponentProps {
  children: ReactNode;
}

const Tip = ({ children }: InformationComponentProps) => (
  <C.Container aria-label="information" as="section" maxW="container.sm" mt={12}>
    <C.VStack spacing={12}>
      <C.Divider borderColor="borderSecondary" h={12} orientation="vertical" />
      <C.VStack spacing={6} textAlign="center">
        <C.Text>{children}</C.Text>
      </C.VStack>
    </C.VStack>
  </C.Container>
);

export default Tip;
