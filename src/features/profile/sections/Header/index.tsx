import * as C from '@chakra-ui/react';
import React, { useContext } from 'react';
import AccountContext from '../../../../context/account';
import AddButton from '../../components/AddButton';
import ApiContext from '../../../../context/api';
import CloudOffline from '../../../../images/cloud-offline.svg';
import IconButtonChevronExpand from '../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../components/IconButtonChevronRight';
import ListItem from './components/ListItem';
import Logo from '../../../../images/logo.svg';
import ProfilesContext from '../../../../context/profiles';
import selectActiveProfile from '../../../../selectors/select-active-profile';

const Header = () => {
  const { account } = useContext(AccountContext);
  const { dispatch } = useContext(ApiContext);
  const { profiles } = useContext(ProfilesContext);
  const { isOpen, onOpen, onToggle } = C.useDisclosure();
  const activeProfile = selectActiveProfile({ account, profiles });

  return (
    <C.Box as="header" layerStyle="header">
      <C.Flex align="center" justify="space-between" pb={2} pt={5}>
        <C.Heading as="h1" lineHeight={1} px={5}>
          <C.VisuallyHidden>lliist</C.VisuallyHidden>
          <C.Icon aria-hidden as={Logo} w="3.8125rem" />
        </C.Heading>
        <C.IconButton
          aria-label="foo bar"
          h={14}
          icon={<C.Icon as={CloudOffline} boxSize={6} />}
          variant="ghost"
          w={14}
        />
      </C.Flex>
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
              aria-label="foo bar"
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
          aria-label="foo bar"
          bottom={2}
          h={isOpen ? 14 : '4rem'}
          isToggled={isOpen}
          onToggle={onToggle}
          pos="absolute"
          right={2}
        />
      )}
    </C.Box>
  );
};

export default Header;
