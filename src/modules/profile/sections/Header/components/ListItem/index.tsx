import React from 'react';
import EditableListItem, { EditableListItemProps } from '../../../../components/EditableListItem';
import useReplicache from '../../../../../../hooks/use-replicache';
import { Profile } from '../../../../../../models/profile';

interface ListItemProps
  extends Omit<EditableListItemProps, 'value' | 'inputHeight' | 'onDelete' | 'onSubmit' | 'previewTextHeight'> {
  autoFocus: boolean;
  profile: Profile;
}

const ListItem = ({ autoFocus, profile, ...rest }: ListItemProps) => {
  const { replicache } = useReplicache();

  return (
    <EditableListItem
      fontSize="xl"
      inputHeight="4rem"
      onDelete={async () => {
        if (!replicache) return;

        await replicache.mutate.deleteProfile({
          accountId: replicache.name,
          id: profile.id,
        });
      }}
      onSubmit={async (text) => {
        if (!replicache) return;

        await replicache.mutate.updateProfile({
          id: profile.id,
          text,
        });
      }}
      previewTextHeight="4rem"
      startWithEditView={autoFocus}
      value={profile.text}
      {...rest}
    />
  );
};

export default ListItem;
