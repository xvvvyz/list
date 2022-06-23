import React from 'react';
import * as T from '../../../../../../types';
import AccountContext from '../../../../../../context/account';
import EditableListItem from '../../../../components/EditableListItem';

interface ProfileListItemProps {
  profile: T.ProfileParsed;
}

const ProfileListItem = ({ profile }: ProfileListItemProps) => {
  const { setProfiles, setUser } = React.useContext(AccountContext);

  return (
    <EditableListItem
      fontSize="3xl"
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
      value={profile.text}
    />
  );
};

export default ProfileListItem;
