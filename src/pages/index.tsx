import React from 'react';
import Checklists from '../modules/profile/sections/Checklists';
import Header from '../modules/profile/sections/Header';
import Items from '../modules/profile/sections/Items';
import Seo from '../modules/profile/components/Seo';
import Tips from '../modules/profile/sections/Tips';
import app from '../layouts/app';

const IndexPage = () => (
  <>
    <Seo />
    <Header />
    <Checklists />
    <Items />
    <Tips />
  </>
);

export default app(IndexPage);
