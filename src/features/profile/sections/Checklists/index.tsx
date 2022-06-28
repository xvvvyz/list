import * as C from '@chakra-ui/react';
import React, { useContext } from 'react';
import AccountContext from '../../../../context/account';
import AddButton from '../../components/AddButton';
import ApiContext from '../../../../context/api';
import CategoriesContext from '../../../../context/categories';
import ChecklistsContext from '../../../../context/checklists';
import IconButtonChevronExpand from '../../components/IconButtonChevronExpand';
import ItemsContext from '../../../../context/items';
import ListItem from './components/ListItem';
import ProfilesContext from '../../../../context/profiles';
import selectActiveProfile from '../../../../selectors/select-active-profile';
import selectDenormalizedChecklist from '../../../../selectors/select-denormalized-checklist';

const Checklists = () => {
  const { account } = useContext(AccountContext);
  const { categories } = useContext(CategoriesContext);
  const { checklists } = useContext(ChecklistsContext);
  const { dispatch } = useContext(ApiContext);
  const { items } = useContext(ItemsContext);
  const { profiles } = useContext(ProfilesContext);
  const { isOpen, onOpen, onToggle } = C.useDisclosure();
  if (!account.profiles.length) return null;
  const activeProfile = selectActiveProfile({ account, profiles });

  return (
    <C.Box aria-label="checklists" as="section" layerStyle="card" mt={12}>
      {!!activeProfile.checklists.length && (
        <ListItem
          checklist={selectDenormalizedChecklist(
            { categories, checklists, items },
            { id: activeProfile.checklists[0] }
          )}
          key={activeProfile.checklists[0]}
        />
      )}
      <C.Collapse in={isOpen}>
        {activeProfile.checklists.slice(1).map((id) => (
          <ListItem checklist={selectDenormalizedChecklist({ categories, checklists, items }, { id })} key={id} />
        ))}
      </C.Collapse>
      <C.Flex>
        <AddButton
          onClick={() => {
            onOpen();
            requestAnimationFrame(() => dispatch({ type: 'CreateChecklist' }));
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
