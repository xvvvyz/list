import * as C from '@chakra-ui/react';
import React, { useState } from 'react';
import { NextPage } from 'next';
import Checklists from '../features/profile/sections/Checklists';
import Header from '../features/profile/sections/Header';
import Items from '../features/profile/sections/Items';
import mockData from '../data/mock-data';
import parseAccount from '../utilities/parse-account';

const IndexPage: NextPage = () => {
  const [categoriesMap, setCategoriesMap] = useState(mockData.categories);
  const [checklistsMap, setChecklistsMap] = useState(mockData.checklists);
  const [itemsMap, setItemsMap] = useState(mockData.items);
  const [profilesMap, setProfilesMap] = useState(mockData.profiles);
  const [userMap, setUserMap] = useState(mockData.user);

  const account = parseAccount({
    categoriesMap,
    checklistsMap,
    itemsMap,
    profilesMap,
    userMap,
  });

  return (
    <C.Container maxW="container.sm" pb={24}>
      <Header
        profiles={account.profiles}
        setProfilesMap={setProfilesMap}
        setUserMap={setUserMap}
      />
      <Checklists
        activeProfileId={userMap.profiles[0]}
        checklists={account.profiles[0]?.checklists || []}
        setChecklistsMap={setChecklistsMap}
        setProfilesMap={setProfilesMap}
      />
      <Items
        activeProfileId={userMap.profiles[0]}
        categories={account.profiles[0]?.categories || []}
        categoriesMap={categoriesMap}
        profilesMap={profilesMap}
        setCategoriesMap={setCategoriesMap}
        setItemsMap={setItemsMap}
        setProfilesMap={setProfilesMap}
      />
    </C.Container>
  );
};

export default IndexPage;
