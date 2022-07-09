import * as C from '@chakra-ui/react';
import React, { useContext } from 'react';
import DispatchContext from '../../../../../../context/dispatch';
import EditableListItem from '../../../../components/EditableListItem';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';
import { ChecklistDenormalized } from '../../../../../../types';

interface ListItemProps {
  autoFocus: boolean;
  checklist: ChecklistDenormalized;
}

const ListItem = ({ autoFocus, checklist }: ListItemProps) => {
  const dispatch = useContext(DispatchContext);

  return (
    <C.Flex>
      <EditableListItem
        defaultValue={checklist.text}
        fontSize="lg"
        fontWeight="bold"
        inputHeight="5.25rem"
        onDelete={() => dispatch({ id: checklist.id, type: 'DeleteChecklist' })}
        onSubmit={(value) => dispatch({ id: checklist.id, text: value, type: 'UpdateChecklist' })}
        previewTextHeight="3.6rem"
        startWithEditView={autoFocus}
        subtext={`${checklist.itemsCompletedCount} of ${checklist.itemsCount} completed`}
        subtextOffset="1rem"
      />
      <IconButtonChevronRight aria-label="open checklist" h="5.25rem" />
    </C.Flex>
  );
};

export default ListItem;
