import * as C from '@chakra-ui/react';
import React from 'react';
import { NextSeo } from 'next-seo';
import Checklists from '../features/profile/sections/Checklists';
import Header from '../features/profile/sections/Header';
import Items from '../features/profile/sections/Items';

const IndexPage = () => (
  <C.Container as="div" layerStyle="app" maxW="container.lg" pb={24} px={0}>
    <NextSeo nofollow noindex />
    <Header />
    <Checklists />
    <Items />
  </C.Container>
);

export default IndexPage;
