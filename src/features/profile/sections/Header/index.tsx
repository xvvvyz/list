import * as C from '@chakra-ui/react';
import React from 'react';
import AccountContext from '../../../../context/account';
import AddButton from '../../../../components/AddButton';
import CloudOffline from '../../../../images/cloud-offline.svg';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';
import Logo from '../../../../images/logo.svg';
import ProfileListItem from './components/ProfileListItem';

const Header = () => {
  const { parsed } = React.useContext(AccountContext);
  const { isOpen, onToggle } = C.useDisclosure();

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
      {!!parsed.length && <ProfileListItem profile={parsed[0]} />}
      <C.Collapse in={isOpen || !parsed.length} transition={parsed.length ? undefined : { enter: { duration: 0 } }}>
        {parsed.slice(1).map((profile) => (
          <C.Flex key={profile.id}>
            <ProfileListItem profile={profile} />
            <IconButtonChevronRight aria-label="foo bar" h="4rem" />
          </C.Flex>
        ))}
        <C.Box pr={parsed.length ? 14 : undefined}>
          <AddButton>add profile</AddButton>
        </C.Box>
      </C.Collapse>
      {!!parsed.length && (
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
