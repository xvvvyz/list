import * as C from '@chakra-ui/react';
import React from 'react';
import AddButton from '../../components/AddButton';
import CloudOffline from '../../../../images/cloud-offline.svg';
import IconButtonChevronExpand from '../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../components/IconButtonChevronRight';
import ListItem from './components/ListItem';
import ThemeToggle from '../../../../images/theme-toggle.svg';
import generateId from '../../../../utilities/generate-id';
import useAccount from '../../../../hooks/use-account';
import useAutoResetState from '../../../../hooks/use-auto-reset-state';
import useAllProfile from '../../../../hooks/use-all-profile';
import useReplicache from '../../../../hooks/use-replicache';

const Header = () => {
  const [autoFocusId, setAutoFocusId] = useAutoResetState('');
  const account = useAccount();
  const profiles = useAllProfile();
  const replicache = useReplicache();
  const { isOpen, onClose, onOpen, onToggle } = C.useDisclosure();
  const { toggleColorMode } = C.useColorMode();

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
        {!!profiles[0] && (
          <C.Box pr={isOpen ? 2 : undefined}>
            <ListItem
              autoFocus={autoFocusId === profiles[0].id}
              key={profiles[0].id}
              profile={profiles[0]}
              w={isOpen ? 'full' : undefined}
            />
          </C.Box>
        )}
        <C.Collapse
          in={isOpen || (!!account && !profiles[0])}
          transition={profiles[0] ? undefined : { enter: { duration: 0 } }}
        >
          {profiles.slice(1).map((profile, i) => (
            <C.Flex key={profile.id}>
              <ListItem autoFocus={autoFocusId === profile.id} profile={profile} />
              <IconButtonChevronRight
                aria-label="open profile"
                h="4rem"
                onClick={async () => {
                  if (!replicache) return;

                  await replicache.mutate.reorderProfile({
                    accountId: replicache.name,
                    fromIndex: i + 1,
                    toIndex: 0,
                  });

                  onClose();
                }}
              />
            </C.Flex>
          ))}
          <C.Box pr={profiles[0] ? 14 : undefined}>
            <AddButton
              onClick={async () => {
                if (!replicache) return;
                const id = generateId();

                await replicache.mutate.createProfile({
                  accountId: replicache.name,
                  id,
                });

                onOpen();
                setAutoFocusId(id);
              }}
            >
              add profile
            </AddButton>
          </C.Box>
        </C.Collapse>
        {!!profiles[0] && (
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
