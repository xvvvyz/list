import React from 'react';
import ApiContext from '../../../../../../context/api';
import EditableListItem, { EditableListItemProps } from '../../../../components/EditableListItem';
import { Profile } from '../../../../../../types';

interface ListItemProps
  extends Omit<EditableListItemProps, 'defaultValue' | 'inputHeight' | 'onDelete' | 'onSubmit' | 'previewTextHeight'> {
  profile: Profile;
}

const ListItem = ({ profile, ...rest }: ListItemProps) => {
  const { dispatch } = React.useContext(ApiContext);

  return (
    <EditableListItem
      defaultValue={profile.text}
      fontSize="xl"
      inputHeight="4rem"
      onDelete={() => dispatch({ id: profile.id, type: 'DeleteProfile' })}
      onSubmit={(value) => dispatch({ id: profile.id, text: value, type: 'UpdateProfile' })}
      previewTextHeight="4rem"
      startWithEditView={profile.meta?.autoFocus}
      {...rest}
    />
  );
};

export default ListItem;
