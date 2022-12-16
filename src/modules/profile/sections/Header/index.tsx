import * as C from '@chakra-ui/react';
import { memo } from 'react';
import useAllProfile from '../../../../hooks/use-all-profile';
import Menu from './components/Menu';
import ProfileList from './components/ProfileList';

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
