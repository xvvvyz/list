import * as C from '@chakra-ui/react';
import { memo, useRef } from 'react';
import { deleteAllReplicacheData } from 'replicache';
import useReplicache from '../../../../../../hooks/use-replicache';
import CheckCircle from '../../../../../../images/check-circle.svg';
import Copy from '../../../../../../images/copy.svg';
import Navigation from '../../../../../../images/navigation.svg';
import ThemeToggle from '../../../../../../images/theme-toggle.svg';
import Trash from '../../../../../../images/trash.svg';

const Menu = () => {
  const [isClearingData, setIsClearingData] = C.useBoolean();
  const clearDataCancelRef = useRef<HTMLButtonElement>(null);
  const clearDataDisclosure = C.useDisclosure();
  const origin = typeof location === 'undefined' ? '' : location.origin;
  const replicache = useReplicache();
  const { colorMode, toggleColorMode } = C.useColorMode();
  const { hasCopied, onCopy } = C.useClipboard(`${origin}/open/${replicache?.name}`);

  return (
    <>
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
        </C.MenuList>
      </C.Menu>
      <C.AlertDialog
        isCentered
        isOpen={clearDataDisclosure.isOpen}
        leastDestructiveRef={clearDataCancelRef}
        motionPreset="slideInBottom"
        onClose={clearDataDisclosure.onClose}
      >
        <C.AlertDialogOverlay>
          <C.AlertDialogContent>
            <C.Heading as={C.AlertDialogHeader} fontWeight="bold" size="lg">
              clear local data?
            </C.Heading>
            <C.AlertDialogBody>
              copy and store your backup link or you will lose access to your&nbsp;profiles.
            </C.AlertDialogBody>
            <C.AlertDialogFooter>
              <C.Button
                fontWeight="bold"
                onClick={clearDataDisclosure.onClose}
                ref={clearDataCancelRef}
                size="sm"
                variant="ghost"
              >
                cancel
              </C.Button>
              <C.Button
                isLoading={isClearingData}
                ml={4}
                onClick={async () => {
                  setIsClearingData.on();
                  await deleteAllReplicacheData();
                  localStorage.clear();
                  location.reload();
                }}
                size="sm"
                variant="primary"
              >
                clear data
              </C.Button>
            </C.AlertDialogFooter>
          </C.AlertDialogContent>
        </C.AlertDialogOverlay>
      </C.AlertDialog>
    </>
  );
};

export default memo(Menu);
