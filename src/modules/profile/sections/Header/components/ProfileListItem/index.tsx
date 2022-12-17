import * as C from '@chakra-ui/react';
import isEqual from 'lodash/isEqual';
import { memo, useRef } from 'react';
import IconButtonChevronRight from '../../../../../../components/IconButtonChevronRight';
import useReplicache from '../../../../../../hooks/use-replicache';
import { ProfileWithIdAndText } from '../../../../../../models/profile';
import EditableListItem from '../../../../components/EditableListItem';

interface ProfileListItemProps {
  autoFocus: boolean;
  isActive?: boolean;
  onOpen?: () => void;
  profile: ProfileWithIdAndText;
}

const ProfileListItem = ({ autoFocus, isActive, onOpen, profile }: ProfileListItemProps) => {
  const replicache = useReplicache();
  const deleteItemCancelRef = useRef<HTMLButtonElement>(null);
  const deleteItemDisclosure = C.useDisclosure();

  return (
    <>
      <C.Flex>
        <EditableListItem
          fontSize="xl"
          inputHeight="4rem"
          onDelete={deleteItemDisclosure.onOpen}
          onSubmit={async (text) => {
            if (!replicache) return;
            await replicache.mutate.updateProfile({ id: profile.id, text });
          }}
          previewTextHeight="4rem"
          startWithEditView={autoFocus}
          value={profile.text}
        />
        {!isActive && (
          <IconButtonChevronRight
            aria-label="open profile"
            onClick={async () => {
              if (!replicache) return;
              if (onOpen) onOpen();
              await replicache.mutate.reorderProfile({ accountId: replicache.name, id: profile.id, toIndex: 0 });
            }}
          />
        )}
        <C.AlertDialog
          isCentered
          isOpen={deleteItemDisclosure.isOpen}
          leastDestructiveRef={deleteItemCancelRef}
          motionPreset="slideInBottom"
          onClose={deleteItemDisclosure.onClose}
        >
          <C.AlertDialogOverlay>
            <C.AlertDialogContent>
              <C.Heading as={C.AlertDialogHeader} fontWeight="bold" size="lg">
                delete &ldquo;{profile.text}&rdquo; profile?
              </C.Heading>
              <C.AlertDialogBody>
                all of its categories, items and checklists will be permanently deleted,&nbsp;too.
              </C.AlertDialogBody>
              <C.AlertDialogFooter>
                <C.Button
                  fontWeight="bold"
                  onClick={deleteItemDisclosure.onClose}
                  ref={deleteItemCancelRef}
                  size="sm"
                  variant="ghost"
                >
                  cancel
                </C.Button>
                <C.Button
                  ml={4}
                  onClick={async () => {
                    if (!replicache) return;
                    await replicache.mutate.deleteProfile({ accountId: replicache.name, id: profile.id });
                  }}
                  size="sm"
                  variant="primary"
                >
                  delete profile
                </C.Button>
              </C.AlertDialogFooter>
            </C.AlertDialogContent>
          </C.AlertDialogOverlay>
        </C.AlertDialog>
      </C.Flex>
    </>
  );
};

export default memo(ProfileListItem, isEqual);
