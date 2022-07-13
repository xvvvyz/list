import * as C from '@chakra-ui/react';
import React from 'react';
import EditableListItem from '../../../../components/EditableListItem';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';
import useReplicache from '../../../../../../hooks/use-replicache';
import { ChecklistDenormalized } from '../../../../../../models/checklist';

interface ListItemProps {
  autoFocus: boolean;
  checklist: ChecklistDenormalized;
}

const ListItem = ({ autoFocus, checklist }: ListItemProps) => {
  const replicache = useReplicache();

  return (
    <C.Flex>
      <EditableListItem
        fontSize="lg"
        fontWeight="bold"
        inputHeight="5.25rem"
        onDelete={async () => {
          if (!replicache) return;

          await replicache.mutate.deleteChecklist({
            accountId: replicache.name,
            id: checklist.id,
          });
        }}
        onSubmit={async (value) => {
          if (!replicache) return;

          await replicache.mutate.updateChecklist({
            id: checklist.id,
            text: value,
          });
        }}
        previewTextHeight="3.6rem"
        startWithEditView={autoFocus}
        subtext={`${checklist.itemsCompletedCount} of ${checklist.itemsCount} completed`}
        subtextOffset="1rem"
        value={checklist.text}
      />
      <IconButtonChevronRight aria-label="open checklist" h="5.25rem" />
    </C.Flex>
  );
};

export default ListItem;
