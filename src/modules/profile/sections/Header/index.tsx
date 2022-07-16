import * as C from '@chakra-ui/react';
import React from 'react';
import AddButton from '../../components/AddButton';
import Copy from '../../../../images/copy.svg';
import IconButtonChevronExpand from '../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../components/IconButtonChevronRight';
import ListItem from './components/ListItem';
import Settings from '../../../../images/settings.svg';
import ThemeToggle from '../../../../images/theme-toggle.svg';
import generateId from '../../../../utilities/generate-id';
import useAllProfile from '../../../../hooks/use-all-profile';
import useEphemeralState from '../../../../hooks/use-ephemeral-state';
import useReplicache from '../../../../hooks/use-replicache';

const Header = () => {
  const [autoFocusId, setAutoFocusId] = useEphemeralState('');
  const profiles = useAllProfile();
  const replicache = useReplicache();
  const { colorMode, toggleColorMode } = C.useColorMode();
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  const { hasCopied, onCopy } = C.useClipboard(`${origin}/open/${replicache?.name}`);
  const { isOpen, onClose, onToggle } = C.useDisclosure();

  return (
    <C.Box as="header" borderTopRadius="none" layerStyle="bgCard">
      <C.Box aria-label="profiles" as="section" pt={5}>
        {!!profiles.length && (
          <C.HStack spacing={0}>
            <ListItem autoFocus={autoFocusId === profiles[0].id} key={profiles[0].id} profile={profiles[0]} />
            <C.Menu autoSelect={false} closeOnSelect={false}>
              <C.MenuButton
                aria-label="settings"
                as={C.IconButton}
                h={16}
                icon={<C.Icon as={Settings} boxSize={6} />}
                variant="ghost"
                w={14}
              />
              <C.MenuList>
                <C.MenuItem icon={<C.Icon as={Copy} />} onClick={onCopy}>
                  {hasCopied ? 'link copied' : 'copy backup link'}
                </C.MenuItem>
                <C.MenuItem icon={<C.Icon as={ThemeToggle} />} onClick={toggleColorMode}>
                  {colorMode === 'dark' ? 'show me the light' : 'join the dark side'}
                </C.MenuItem>
              </C.MenuList>
            </C.Menu>
          </C.HStack>
        )}
        <C.Collapse in={isOpen} transition={profiles.length ? undefined : { enter: { duration: 0 } }}>
          {profiles.slice(1).map((profile) => (
            <C.Flex key={profile.id}>
              <ListItem autoFocus={autoFocusId === profile.id} profile={profile} />
              <IconButtonChevronRight
                aria-label="open profile"
                h={16}
                onClick={async () => {
                  if (!replicache) return;
                  onClose();

                  await replicache.mutate.reorderProfile({
                    accountId: replicache.name,
                    id: profile.id,
                    toIndex: 0,
                  });
                }}
              />
            </C.Flex>
          ))}
        </C.Collapse>
        <C.Flex>
          <AddButton
            onClick={async () => {
              if (!replicache) return;
              const id = generateId();
              setAutoFocusId(id);

              await replicache.mutate.createProfile({
                accountId: replicache.name,
                atBeginning: !isOpen,
                id,
              });
            }}
          >
            add profile
          </AddButton>
          {profiles.length > 1 && <IconButtonChevronExpand isToggled={isOpen} onToggle={onToggle} />}
        </C.Flex>
      </C.Box>
    </C.Box>
  );
};

export default Header;
