import * as C from '@chakra-ui/react';
import React from 'react';
import AccountContext from '../../../../context/account';
import AddButton from '../../../../components/AddButton';
import ChecklistListItem from './components/ChecklistListItem';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';

const Checklists = () => {
  const { activeProfile } = React.useContext(AccountContext);
  const { isOpen, onToggle } = C.useDisclosure();
  if (!activeProfile) return null;
  const { checklists } = activeProfile;

  return (
    <C.Box as="section" mt={12}>
      <C.Heading as="h2" color="fgGhost" px={7} size="lg">
        checklists
      </C.Heading>
      <C.Box layerStyle="card" mt={5}>
        {!!checklists.length && (
          <C.Flex>
            <ChecklistListItem checklist={checklists[0]} />
            <IconButtonChevronRight aria-label="foo bar" h="5.25rem" />
          </C.Flex>
        )}
        <C.Collapse in={isOpen}>
          {checklists.slice(1).map((checklist) => (
            <C.Flex key={checklist.id}>
              <ChecklistListItem checklist={checklist} />
              <IconButtonChevronRight aria-label="foo bar" h="5.25rem" />
            </C.Flex>
          ))}
        </C.Collapse>
        <C.Flex>
          <AddButton>add checklist</AddButton>
          {checklists.length > 1 && (
            <IconButtonChevronExpand aria-label="foo bar" isToggled={isOpen} onToggle={onToggle} />
          )}
        </C.Flex>
      </C.Box>
    </C.Box>
  );
};

export default Checklists;
