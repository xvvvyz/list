import * as C from '@chakra-ui/react';
import * as D from '@dnd-kit/core';
import React from 'react';
import AccountContext from '../../../../../../../../context/account';
import AddButton from '../../../../../../../../components/AddButton';
import Item from '../Item';
import SortableListContext from '../../../../context/sortable-list';

const DragOverlay = () => {
  const { categories } = React.useContext(AccountContext);
  const { draggingId, overCategoryId } = React.useContext(SortableListContext);
  const isDraggingCategory = draggingId in categories;

  return (
    <C.Portal>
      <D.DragOverlay dropAnimation={null}>
        {!!draggingId && (
          <Item
            categoryId={isDraggingCategory ? draggingId : overCategoryId}
            index={0}
            isOverlay
            itemId={isDraggingCategory ? undefined : draggingId}
          >
            {isDraggingCategory ? (
              <>
                {categories[draggingId].items.map((itemId, index) => (
                  <Item categoryId={overCategoryId} index={index} itemId={itemId} key={`overlay-${itemId}`} />
                ))}
                <AddButton h={10}>add item</AddButton>
              </>
            ) : null}
          </Item>
        )}
      </D.DragOverlay>
    </C.Portal>
  );
};

export default DragOverlay;
