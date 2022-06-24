import * as C from '@chakra-ui/react';
import React from 'react';
import AccountContext from '../../../../context/account';
import SortableList from './components/SortableList';
import SortableListProvider from './components/SortableListProvider';

const Items = () => {
  const { activeProfile } = React.useContext(AccountContext);
  if (!activeProfile) return null;

  return (
    <C.Box as="section" mt={12}>
      <C.Heading as="h2" color="fgGhost" px={7} size="lg">
        items
      </C.Heading>
      <C.Box layerStyle="card" mt={5}>
        <SortableListProvider>
          <SortableList />
        </SortableListProvider>
      </C.Box>
    </C.Box>
  );
};

export default Items;
