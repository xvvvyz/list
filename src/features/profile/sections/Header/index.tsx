import * as C from '@chakra-ui/react';
import React from 'react';
import AddButton from '../../../../components/AddButton';
import CloudOffline from '../../../../images/cloud-offline.svg';
import EditableListItem from '../../components/EditableListItem';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';
import Logo from '../../../../images/logo.svg';

const Header = ({ profiles, setProfilesMap, setUserMap }) => {
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
      {!!profiles.length && (
        <EditableListItem
          fontSize="3xl"
          inputHeight="4rem"
          onChange={(value) =>
            setProfilesMap((profilesMap) => ({
              ...profilesMap,
              [profiles[0].id]: { ...profilesMap[profiles[0].id], text: value },
            }))
          }
          onDelete={() =>
            setUserMap((userMap) => ({
              ...userMap,
              profiles: userMap.profiles.filter((id) => id !== profiles[0].id),
            }))
          }
          previewTextHeight="4rem"
          value={profiles[0].text}
        />
      )}
      <C.Collapse
        in={isOpen || !profiles.length}
        transition={profiles.length ? undefined : { enter: { duration: 0 } }}
      >
        {profiles.slice(1).map((profile) => (
          <C.Flex key={profile.id}>
            <EditableListItem
              fontSize="3xl"
              inputHeight="4rem"
              onChange={(value) =>
                setProfilesMap((profilesMap) => ({
                  ...profilesMap,
                  [profile.id]: { ...profilesMap[profile.id], text: value },
                }))
              }
              onDelete={() =>
                setUserMap((userMap) => ({
                  ...userMap,
                  profiles: userMap.profiles.filter((id) => id !== profile.id),
                }))
              }
              previewTextHeight="4rem"
              value={profile.text}
            />
            <IconButtonChevronRight h="4rem" label="foo bar" />
          </C.Flex>
        ))}
        <C.Box pr={profiles.length ? 14 : undefined}>
          <AddButton>add profile</AddButton>
        </C.Box>
      </C.Collapse>
      {!!profiles.length && (
        <IconButtonChevronExpand
          bottom={2}
          h={isOpen ? 14 : '4rem'}
          isToggled={isOpen}
          label="foo bar"
          onToggle={onToggle}
          pos="absolute"
          right={2}
        />
      )}
    </C.Box>
  );
};

export default Header;
