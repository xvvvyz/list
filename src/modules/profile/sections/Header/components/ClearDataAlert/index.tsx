import * as C from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';

interface ClearDataAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClearDataAlert = ({ isOpen, onClose }: ClearDataAlertProps) => {
  const [isLoading, setIsLoading] = C.useBoolean();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  return (
    <C.AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <C.AlertDialogOverlay>
        <C.AlertDialogContent>
          <C.Heading as={C.AlertDialogHeader} fontWeight="bold" size="lg">
            clear local data
          </C.Heading>
          <C.AlertDialogBody>
            copy and save your backup link before continuing. any local changes that have not been synced will be
            permanently lost.
          </C.AlertDialogBody>
          <C.AlertDialogFooter>
            <C.Button fontWeight="bold" onClick={onClose} ref={cancelRef} size="sm" variant="ghost">
              cancel
            </C.Button>
            <C.Button
              isLoading={isLoading}
              ml={4}
              onClick={async () => {
                setIsLoading.on();
                await router.replace('/open/new-space');
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
  );
};

export default ClearDataAlert;
