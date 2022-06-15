import * as C from '@chakra-ui/react';
import React, { useState } from 'react';
import { NextPage } from 'next';
import Checklists from '../features/profile/sections/Checklists';
import Header from '../features/profile/sections/Header';
import Items from '../features/profile/sections/Items';
import mockData from '../data/mock-data';
import parseAccount from '../utilities/parse-account';

const IndexPage: NextPage = () => {
  const [categories] = useState(mockData.categories);
  const [checklists] = useState(mockData.checklists);
  const [items] = useState(mockData.items);
  const [profiles] = useState(mockData.profiles);
  const [user] = useState(mockData.user);

  const account = parseAccount({
    categories,
    checklists,
    items,
    profiles,
    user,
  });

  return (
    <C.Container maxW="container.sm" pb={12}>
      <Header profiles={account.profiles} />
      <Checklists checklists={account.profiles[0].checklists} />
      <Items categories={account.profiles[0].categories} />
    </C.Container>
  );
};

export default IndexPage;
