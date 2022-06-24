import * as D from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import React from 'react';
import AccountContext from '../../../../../../context/account';
import AddButton from '../../../../../../components/AddButton';
import DragOverlay from './components/DragOverlay';
import Sortable from './components/Sortable';
import useCollisionDetection from './utilities/use-collision-detection';
import useCreateCategory from './utilities/use-create-category';
import useCreateItem from './utilities/use-create-item';
import useOnDragCancel from './utilities/use-on-drag-cancel';
import useOnDragEnd from './utilities/use-on-drag-end';
import useOnDragOver from './utilities/use-on-drag-over';
import useOnDragStart from './utilities/use-on-drag-start';
import useSensors from './utilities/use-sensors';

const SortableList = () => {
  const collisionDetection = useCollisionDetection();
  const createCategory = useCreateCategory();
  const createItem = useCreateItem();
  const onDragCancel = useOnDragCancel();
  const onDragEnd = useOnDragEnd();
  const onDragOver = useOnDragOver();
  const onDragStart = useOnDragStart();
  const sensors = useSensors();
  const { activeProfile } = React.useContext(AccountContext);

  if (!activeProfile) return null;

  return (
    <D.DndContext
      collisionDetection={collisionDetection}
      id="items-dnd-context"
      onDragCancel={onDragCancel}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      sensors={sensors}
    >
      <DS.SortableContext items={activeProfile.categories} strategy={DS.verticalListSortingStrategy}>
        {activeProfile.categories.map((category, categoryIndex) => (
          <Sortable categoryId={category.id} index={categoryIndex} key={category.id}>
            <DS.SortableContext items={category.items} strategy={DS.verticalListSortingStrategy}>
              {category.items.map((item, itemIndex) => (
                <Sortable categoryId={category.id} index={itemIndex} itemId={item.id} key={item.id} />
              ))}
            </DS.SortableContext>
            <AddButton
              h={10}
              onClick={() =>
                createItem({
                  atIndex: category.items.length,
                  categoryId: category.id,
                  text: '',
                })
              }
            >
              add item
            </AddButton>
          </Sortable>
        ))}
      </DS.SortableContext>
      <AddButton
        onClick={() =>
          createCategory({
            atIndex: activeProfile.categories.length,
            text: '',
          })
        }
      >
        add category
      </AddButton>
      <DragOverlay />
    </D.DndContext>
  );
};

export default SortableList;
