import React from 'react';
import Header from '../../modules/checklist/sections/Header';
import Items from '../../modules/checklist/sections/Items';
import Seo from '../../modules/checklist/sections/Seo';
import Tips from '../../modules/checklist/sections/Tips';
import app from '../../layouts/app';

const ChecklistPage = () => (
  <>
    <Seo />
    <Header />
    <Items />
    <Tips />
  </>
);

export default app(ChecklistPage);
