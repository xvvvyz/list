import React from 'react';
import EditableListItem from '../../../../components/EditableListItem';
import * as T from '../../../../../../types';
import AccountContext from '../../../../../../context/account';

interface ChecklistListItemProps {
  checklist: T.ChecklistParsed;
}

const ChecklistListItem = ({ checklist }: ChecklistListItemProps) => {
  const { activeProfile, setChecklists, setProfiles } = React.useContext(AccountContext);
  if (!activeProfile) return null;

  return (
    <EditableListItem
      fontSize="lg"
      fontWeight="bold"
      inputHeight="5.25rem"
      onChange={(value) =>
        setChecklists((state) => ({
          ...state,
          [checklist.id]: { ...state[checklist.id], text: value },
        }))
      }
      onDelete={() =>
        setProfiles((state) => ({
          ...state,
          [activeProfile.id]: {
            ...state[activeProfile.id],
            checklists: state[activeProfile.id].checklists.filter((id) => id !== checklist.id),
          },
        }))
      }
      previewTextHeight="3.6rem"
      subtext={`${checklist.itemsCompletedCount} of ${checklist.itemsCount} completed`}
      subtextOffset="1rem"
      value={checklist.text}
    />
  );
};

export default ChecklistListItem;
