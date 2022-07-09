import * as C from '@chakra-ui/react';
import React, { useContext } from 'react';
import AccountContext from '../../../../context/account';
import AddButton from '../../components/AddButton';
import CategoriesContext from '../../../../context/categories';
import ChecklistsContext from '../../../../context/checklists';
import DispatchContext from '../../../../context/dispatch';
import IconButtonChevronExpand from '../../components/IconButtonChevronExpand';
import ItemsContext from '../../../../context/items';
import ListItem from './components/ListItem';
import ProfilesContext from '../../../../context/profiles';
import generateId from '../../../../utilities/generate-id';
import selectActiveProfile from '../../../../selectors/select-active-profile';
import selectDenormalizedChecklist from '../../../../selectors/select-denormalized-checklist';
import useAutoResetState from '../../../../utilities/use-auto-reset-state';
import { Id } from '../../../../types';

const Checklists = () => {
  const account = useContext(AccountContext);
  const categories = useContext(CategoriesContext);
  const checklists = useContext(ChecklistsContext);
  const dispatch = useContext(DispatchContext);
  const items = useContext(ItemsContext);
  const profiles = useContext(ProfilesContext);
  const [autoFocusId, setAutoFocusId] = useAutoResetState<Id>('');
  const { isOpen, onToggle } = C.useDisclosure();
  if (!account.profiles.length) return null;
  const activeProfile = selectActiveProfile({ account, profiles });

  return (
    <C.Box aria-label="checklists" as="section" layerStyle="bgCard" mt={12}>
      {!!activeProfile.checklists.length && (
        <ListItem
          autoFocus={autoFocusId === activeProfile.checklists[0]}
          checklist={selectDenormalizedChecklist(
            { categories, checklists, items },
            { id: activeProfile.checklists[0] }
          )}
          key={activeProfile.checklists[0]}
        />
      )}
      <C.Collapse in={isOpen}>
        {activeProfile.checklists.slice(1).map((id) => (
          <ListItem
            autoFocus={autoFocusId === id}
            checklist={selectDenormalizedChecklist({ categories, checklists, items }, { id })}
            key={id}
          />
        ))}
      </C.Collapse>
      <C.Flex>
        <AddButton
          onClick={() => {
            const id = generateId();
            dispatch({ atBeginning: !isOpen, id, type: 'CreateChecklist' });
            setAutoFocusId(id);
          }}
        >
          add checklist
        </AddButton>
        {activeProfile.checklists.length > 1 && <IconButtonChevronExpand isToggled={isOpen} onToggle={onToggle} />}
      </C.Flex>
    </C.Box>
  );
};

export default Checklists;
