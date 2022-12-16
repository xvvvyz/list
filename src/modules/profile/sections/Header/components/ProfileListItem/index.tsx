import * as C from '@chakra-ui/react';
import isEqual from 'lodash/isEqual';
import { memo } from 'react';
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

  return (
    <C.Flex>
      <EditableListItem
        fontSize="xl"
        inputHeight="4rem"
        onDelete={async () => {
          if (!replicache) return;
          await replicache.mutate.deleteProfile({ accountId: replicache.name, id: profile.id });
        }}
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
    </C.Flex>
  );
};

export default memo(ProfileListItem, isEqual);
