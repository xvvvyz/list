import * as C from '@chakra-ui/react';
import React from 'react';
import * as T from '../../../../../../types';
import AccountContext from '../../../../../../context/account';
import EditableListItem from '../../../../components/EditableListItem';
import IconButtonChevronRight from '../../../../../../components/IconButtonChevronRight';

interface ChecklistListItemProps {
  checklist: T.ChecklistParsed;
}

const ChecklistListItem = ({ checklist }: ChecklistListItemProps) => {
  const { activeProfile, setChecklists, setProfiles } = React.useContext(AccountContext);
  if (!activeProfile) return null;

  return (
    <C.Flex>
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
        startWithEditView={checklist.meta?.isNew}
        subtext={`${checklist.itemsCompletedCount} of ${checklist.itemsCount} completed`}
        subtextOffset="1rem"
        value={checklist.text}
      />
      <IconButtonChevronRight aria-label="foo bar" h="5.25rem" />
    </C.Flex>
  );
};

export default ChecklistListItem;
