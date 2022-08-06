import * as C from '@chakra-ui/react';
import React, { memo } from 'react';
import Menu from './components/Menu';
import ProfileList from './components/ProfileList';
import useAllProfile from '../../../../hooks/use-all-profile';

const Header = () => {
  const profiles = useAllProfile();

  return (
    <C.Box as="header" borderTopRadius="none" layerStyle="bgCard">
      {!!profiles.length && <Menu />}
      <ProfileList profiles={profiles} />
    </C.Box>
  );
};

export default memo(Header);
