import * as C from '@chakra-ui/react';
import React from 'react';
import * as T from '../../../../../../types';
import AccountContext from '../../../../../../context/account';
import EditableListItem from '../../../../components/EditableListItem';

interface ProfileListItemProps extends Omit<C.BoxProps, 'onChange'> {
  profile: T.ProfileParsed;
}

const ProfileListItem = ({ profile, ...rest }: ProfileListItemProps) => {
  const { setProfiles, setUser } = React.useContext(AccountContext);

  return (
    <EditableListItem
      fontSize="xl"
      inputHeight="4rem"
      onChange={(value) =>
        setProfiles((state) => ({
          ...state,
          [profile.id]: { ...state[profile.id], text: value },
        }))
      }
      onDelete={() =>
        setUser((state) => ({
          ...state,
          profiles: state.profiles.filter((id) => id !== profile.id),
        }))
      }
      previewTextHeight="4rem"
      startWithEditView={profile.meta?.isNew}
      value={profile.text}
      {...rest}
    />
  );
};

export default ProfileListItem;
