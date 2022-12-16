import * as C from '@chakra-ui/react';
import isEqual from 'lodash/isEqual';
import { memo } from 'react';
import ButtonChevronExpand from '../../../../../../components/ButtonChevronExpand';
import useEphemeralState from '../../../../../../hooks/use-ephemeral-state';
import useReplicache from '../../../../../../hooks/use-replicache';
import { ChecklistDenormalizedWithoutCategories } from '../../../../../../models/checklist';
import generateId from '../../../../../../utilities/generate-id';
import AddButton from '../../../../components/AddButton';
import ListItem from '../ChecklistListItem';

interface ChecklistListProps {
  checklists: ChecklistDenormalizedWithoutCategories[];
}

const ChecklistList = ({ checklists }: ChecklistListProps) => {
  const [autoFocusId, setAutoFocusId] = useEphemeralState('');
  const replicache = useReplicache();
  const { isOpen, onToggle } = C.useDisclosure();

  return (
    <C.Box aria-label="checklists" as="section" layerStyle="bgCard" mt={12}>
      {!!checklists.length && (
        <ListItem autoFocus={autoFocusId === checklists[0].id} checklist={checklists[0]} key={checklists[0].id} />
      )}
      <C.Collapse in={isOpen}>
        {checklists.slice(1).map((checklist) => (
          <ListItem autoFocus={autoFocusId === checklist.id} checklist={checklist} key={checklist.id} />
        ))}
      </C.Collapse>
      <C.Flex>
        <AddButton
          onClick={async () => {
            if (!replicache) return;
            const id = generateId();
            setAutoFocusId(id);

            await replicache.mutate.createChecklist({
              accountId: replicache.name,
              atBeginning: !isOpen,
              id,
            });
          }}
        >
          add checklist
        </AddButton>
        {checklists.length > 1 && <ButtonChevronExpand isToggled={isOpen} onToggle={onToggle} />}
      </C.Flex>
    </C.Box>
  );
};

export default memo(ChecklistList, isEqual);
