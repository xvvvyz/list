import * as C from '@chakra-ui/react';
import React from 'react';
import Menu from './components/Menu';
import Profiles from './components/Profiles';

const Header = () => {
  return (
    <C.Box as="header" borderTopRadius="none" layerStyle="bgCard">
      <Menu />
      <Profiles />
    </C.Box>
  );
};

export default Header;
