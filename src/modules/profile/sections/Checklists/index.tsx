import * as C from '@chakra-ui/react';
import React from 'react';
import AddButton from '../../components/AddButton';
import IconButtonChevronExpand from '../../components/IconButtonChevronExpand';
import ListItem from './components/ListItem';
import generateId from '../../../../utilities/generate-id';
import useActiveProfile from '../../../../hooks/use-active-profile';
import useAllChecklistDenormalized from '../../../../hooks/use-all-checklist-denormalized';
import useEphemeralState from '../../../../hooks/use-ephemeral-state';
import useReplicache from '../../../../hooks/use-replicache';

const Checklists = () => {
  const [autoFocusId, setAutoFocusId] = useEphemeralState('');
  const activeProfile = useActiveProfile();
  const checklists = useAllChecklistDenormalized();
  const replicache = useReplicache();
  const { isOpen, onToggle } = C.useDisclosure();
  if (!activeProfile) return null;

  return (
    <C.Box aria-label="checklistIds" as="section" layerStyle="bgCard" mt={12}>
      {!!checklists[0] && (
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
        {activeProfile.checklistIds.length > 1 && <IconButtonChevronExpand isToggled={isOpen} onToggle={onToggle} />}
      </C.Flex>
    </C.Box>
  );
};

export default Checklists;
