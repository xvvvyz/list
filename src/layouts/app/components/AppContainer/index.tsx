import * as C from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer = ({ children }: AppContainerProps) => (
  <C.Container as="div" layerStyle="app" maxW="container.lg" pb={24} px={0}>
    {children}
  </C.Container>
);

export default AppContainer;
