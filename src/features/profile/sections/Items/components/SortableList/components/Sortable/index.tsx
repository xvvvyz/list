import * as DS from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import Item, { ItemProps } from '../Item';

type SortableProps = Pick<ItemProps, 'categoryId' | 'children' | 'index' | 'itemId'>;

const Sortable = ({ categoryId, itemId, ...rest }: SortableProps) => {
  const categoryOrItem = itemId ? 'category' : 'item';
  const id = itemId || categoryId;

  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition } = DS.useSortable({
    animateLayoutChanges: DS.defaultAnimateLayoutChanges,
    id,
  });

  return (
    <Item
      categoryId={categoryId}
      containerProps={{
        ref: setNodeRef,
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      dragHandleProps={{
        ...attributes,
        ...listeners,
        'aria-label': `sort ${categoryOrItem}`,
        'aria-roledescription': `sortable ${categoryOrItem}`,
        ref: setActivatorNodeRef,
      }}
      isDragging={isDragging}
      itemId={itemId}
      {...rest}
    />
  );
};

export default Sortable;
