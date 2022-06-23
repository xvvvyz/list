import * as C from '@chakra-ui/react';
import React from 'react';
import Checklists from '../features/profile/sections/Checklists';
import Header from '../features/profile/sections/Header';
import Items from '../features/profile/sections/Items';

const IndexPage = () => (
  <C.Container maxW="container.sm" pb={24}>
    <Header />
    <Checklists />
    <Items />
  </C.Container>
);

export default IndexPage;
