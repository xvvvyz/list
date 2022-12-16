import * as C from '@chakra-ui/react';
import isEqual from 'lodash/isEqual';
import { memo } from 'react';
import IconButtonChevronRight from '../../../../../../components/IconButtonChevronRight';
import useReplicache from '../../../../../../hooks/use-replicache';
import { ChecklistDenormalizedWithoutCategories } from '../../../../../../models/checklist';
import EditableListItem from '../../../../components/EditableListItem';

interface ListItemProps {
  autoFocus: boolean;
  checklist: ChecklistDenormalizedWithoutCategories;
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
          await replicache.mutate.deleteChecklist({ accountId: replicache.name, id: checklist.id });
        }}
        onSubmit={async (text: string) => {
          if (!replicache) return;
          await replicache.mutate.updateChecklist({ id: checklist.id, text });
        }}
        previewTextHeight="3.6rem"
        startWithEditView={autoFocus}
        subtext={`${checklist.itemsCompletedCount} of ${checklist.itemsCount} completed`}
        subtextOffset="1rem"
        value={checklist.text}
      />
      <IconButtonChevronRight
        aria-label="open checklist"
        h="5.25rem"
        href={`/checklist/${checklist.id}`}
        onClick={async () => {
          if (!replicache) return;
          await replicache.mutate.reorderChecklist({ accountId: replicache.name, id: checklist.id, toIndex: 0 });
        }}
      />
    </C.Flex>
  );
};

export default memo(ListItem, isEqual);
