import * as C from '@chakra-ui/react';
import React from 'react';
import CloudOffline from '../../../../images/cloud-offline.svg';
import EditableListItem from '../../components/EditableListItem';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';
import Logo from '../../../../images/logo.svg';
import Plus from '../../../../images/plus.svg';

const Header = ({ profiles }) => {
  const { isOpen: showAllProfiles, onToggle: onShowAllProfilesToggle } =
    C.useDisclosure();

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
      <EditableListItem
        fontSize="3xl"
        inputHeight="4rem"
        previewTextHeight="4rem"
        text={profiles[0].text}
      />
      <C.Collapse in={showAllProfiles}>
        <C.SlideFade in={showAllProfiles} offsetY="1rem">
          {profiles.slice(1).map((profile) => (
            <C.Flex key={profile.id}>
              <EditableListItem
                fontSize="3xl"
                inputHeight="4rem"
                previewTextHeight="4rem"
                text={profile.text}
              />
              <IconButtonChevronRight h="4rem" label="foo bar" />
            </C.Flex>
          ))}
          <C.Box pr={14}>
            <C.Button
              h={14}
              iconSpacing={6}
              justifyContent="flex-start"
              leftIcon={<C.Icon as={Plus} boxSize={6} />}
              pl={4}
              pr={5}
              variant="ghost"
              w="full"
            >
              add profile
            </C.Button>
          </C.Box>
        </C.SlideFade>
      </C.Collapse>
      <IconButtonChevronExpand
        bottom={2}
        h={showAllProfiles ? 14 : '4rem'}
        isToggled={showAllProfiles}
        label="foo bar"
        onToggle={onShowAllProfilesToggle}
        pos="absolute"
        right={2}
      />
    </C.Box>
  );
};

export default Header;
