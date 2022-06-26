import * as C from '@chakra-ui/react';
import React, { useContext } from 'react';
import ApiContext from '../../../../../../context/api';
import EditableListItem from '../../../../components/EditableListItem';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';
import { ChecklistDenormalized } from '../../../../../../types';

interface ListItemProps {
  checklist: ChecklistDenormalized;
}

const ListItem = ({ checklist }: ListItemProps) => {
  const { dispatch } = useContext(ApiContext);

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
        subtext={`${checklist.itemsCompletedCount} of ${checklist.itemsCount} completed`}
        subtextOffset="1rem"
      />
      <IconButtonChevronRight aria-label="foo bar" h="5.25rem" />
    </C.Flex>
  );
};

export default ListItem;
