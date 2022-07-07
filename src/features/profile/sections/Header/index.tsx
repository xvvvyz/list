import * as C from '@chakra-ui/react';
import React, { useContext } from 'react';
import AccountContext from '../../../../context/account';
import AddButton from '../../components/AddButton';
import ApiContext from '../../../../context/api';
import CloudOffline from '../../../../images/cloud-offline.svg';
import IconButtonChevronExpand from '../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../components/IconButtonChevronRight';
import ListItem from './components/ListItem';
import ProfilesContext from '../../../../context/profiles';
import ThemeToggle from '../../../../images/theme-toggle.svg';
import selectActiveProfile from '../../../../selectors/select-active-profile';

const Header = () => {
  const { account } = useContext(AccountContext);
  const { dispatch } = useContext(ApiContext);
  const { profiles } = useContext(ProfilesContext);
  const { isOpen, onOpen, onToggle } = C.useDisclosure();
  const { toggleColorMode } = C.useColorMode();
  const activeProfile = selectActiveProfile({ account, profiles });

  return (
    <C.Box aria-label="header" as="header" borderTopRadius="none" layerStyle="bgCard">
      <C.HStack justify="space-between" pb={2} pt={5}>
        <C.IconButton
          aria-label="toggle theme"
          boxSize={14}
          icon={<C.Icon as={ThemeToggle} boxSize={6} />}
          onClick={toggleColorMode}
          variant="ghost"
        />
        <C.Badge>offline</C.Badge>
        <C.IconButton
          aria-label="backup settings"
          boxSize={14}
          icon={<C.Icon as={CloudOffline} boxSize={6} />}
          variant="ghost"
        />
      </C.HStack>
      <C.Box aria-label="profiles" as="section">
        {!!account.profiles.length && (
          <ListItem key={activeProfile.id} profile={activeProfile} w={isOpen ? 'full' : undefined} />
        )}
        <C.Collapse
          in={isOpen || !account.profiles.length}
          transition={account.profiles.length ? undefined : { enter: { duration: 0 } }}
        >
          {account.profiles.slice(1).map((id) => (
            <C.Flex key={id}>
              <ListItem profile={profiles[id]} />
              <IconButtonChevronRight
                aria-label="select"
                h="4rem"
                onClick={() => dispatch({ id, type: 'SetActiveProfile' })}
              />
            </C.Flex>
          ))}
          <C.Box pr={account.profiles.length ? 14 : undefined}>
            <AddButton
              onClick={() => {
                onOpen();
                dispatch({ type: 'CreateProfile' });
              }}
            >
              add profile
            </AddButton>
          </C.Box>
        </C.Collapse>
        {!!account.profiles.length && (
          <IconButtonChevronExpand
            bottom={2}
            h={isOpen ? 14 : '4rem'}
            isToggled={isOpen}
            onToggle={onToggle}
            pos="absolute"
            right={2}
          />
        )}
      </C.Box>
    </C.Box>
  );
};

export default Header;
