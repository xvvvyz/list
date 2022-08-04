import * as C from '@chakra-ui/react';
import CheckCircle from '../../../../../../images/check-circle.svg';
import ClearDataAlert from '../ClearDataAlert';
import Copy from '../../../../../../images/copy.svg';
import Navigation from '../../../../../../images/navigation.svg';
import React from 'react';
import ThemeToggle from '../../../../../../images/theme-toggle.svg';
import Trash from '../../../../../../images/trash.svg';
import useActiveProfile from '../../../../../../hooks/use-active-profile';
import useReplicache from '../../../../../../hooks/use-replicache';

const Menu = () => {
  const clearDataDisclosure = C.useDisclosure();
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  const activeProfile = useActiveProfile();
  const { colorMode, toggleColorMode } = C.useColorMode();
  const { replicache } = useReplicache();
  const { hasCopied, onCopy } = C.useClipboard(`${origin}/open/${replicache?.name}`);
  if (!activeProfile) return null;

  return (
    <C.Menu autoSelect={false} closeOnSelect={false}>
      <C.MenuButton
        aria-label="settings"
        as={C.IconButton}
        flexShrink={0}
        h={16}
        icon={<C.Icon as={Navigation} boxSize={6} />}
        pos="absolute"
        right={2}
        top={7}
        variant="ghost"
        w={14}
      />
      <C.MenuList>
        <C.MenuItem icon={<C.Icon as={ThemeToggle} />} onClick={toggleColorMode}>
          {colorMode === 'dark' ? 'show me the light' : 'join the dark side'}
        </C.MenuItem>
        <C.MenuItem icon={<C.Icon as={hasCopied ? CheckCircle : Copy} />} onClick={onCopy}>
          {hasCopied ? 'the link is yours!' : 'copy backup link'}
        </C.MenuItem>
        <C.MenuItem icon={<C.Icon as={Trash} />} onClick={clearDataDisclosure.onOpen}>
          clear local data
        </C.MenuItem>
        <ClearDataAlert isOpen={clearDataDisclosure.isOpen} onClose={clearDataDisclosure.onClose} />
      </C.MenuList>
    </C.Menu>
  );
};

export default Menu;
