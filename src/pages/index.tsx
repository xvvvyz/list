import * as C from '@chakra-ui/react';
import React from 'react';
import { NextSeo } from 'next-seo';
import Checklists from '../modules/profile/sections/Checklists';
import Header from '../modules/profile/sections/Header';
import Information from '../modules/profile/sections/Information';
import Items from '../modules/profile/sections/Items';
import withReplicache from '../layouts/with-replicache';

const IndexPage = () => (
  <>
    <NextSeo nofollow noindex title="items" />
    <C.Container as="div" layerStyle="app" maxW="container.lg" pb={24} px={0}>
      <Header />
      <Checklists />
      <Items />
      <Information />
    </C.Container>
  </>
);

export default withReplicache(IndexPage);
