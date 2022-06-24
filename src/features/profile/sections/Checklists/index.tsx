import * as C from '@chakra-ui/react';
import React from 'react';
import AccountContext from '../../../../context/account';
import AddButton from '../../../../components/AddButton';
import ChecklistListItem from './components/ChecklistListItem';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import generateId from '../../../../utilities/generate-id';
import { IdPrefix } from '../../../../enums';

const Checklists = () => {
  const { activeProfile, setChecklists, setProfiles } = React.useContext(AccountContext);
  const { isOpen, onOpen, onToggle } = C.useDisclosure();
  if (!activeProfile) return null;
  const { checklists } = activeProfile;

  return (
    <C.Box as="section" mt={12}>
      <C.Heading as="h2" color="fgGhost" px={7} size="lg">
        checklists
      </C.Heading>
      <C.Box layerStyle="card" mt={5}>
        {!!checklists.length && <ChecklistListItem checklist={checklists[0]} />}
        <C.Collapse in={isOpen}>
          {checklists.slice(1).map((checklist) => (
            <ChecklistListItem checklist={checklist} key={checklist.id} />
          ))}
        </C.Collapse>
        <C.Flex>
          <AddButton
            onClick={() => {
              const newChecklist = {
                categories: [],
                completed: [],
                id: generateId(IdPrefix.Checklist),
                meta: { isNew: true },
                tags: [],
                text: '',
              };

              onOpen();

              setChecklists((state) => ({
                ...state,
                [newChecklist.id]: newChecklist,
              }));

              setProfiles((state) => ({
                ...state,
                [activeProfile.id]: {
                  ...state[activeProfile.id],
                  checklists: [...state[activeProfile.id].checklists, newChecklist.id],
                },
              }));
            }}
          >
            add checklist
          </AddButton>
          {checklists.length > 1 && (
            <IconButtonChevronExpand aria-label="foo bar" isToggled={isOpen} onToggle={onToggle} />
          )}
        </C.Flex>
      </C.Box>
    </C.Box>
  );
};

export default Checklists;
