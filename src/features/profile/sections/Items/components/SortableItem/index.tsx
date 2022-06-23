import * as DS from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import Item, { ItemProps } from '../Item';

type SortableItemProps = Pick<
  ItemProps,
  'id' | 'isActiveDropzone' | 'isExpanded' | 'nestedItems' | 'onDelete' | 'textareaProps' | 'toggleExpanded'
>;

const SortableItem = ({ id, nestedItems, ...rest }: SortableItemProps) => {
  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition } = DS.useSortable({
    animateLayoutChanges: DS.defaultAnimateLayoutChanges,
    data: { isContainer: true },
    id,
    transition: { duration: 200, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' },
  });

  const categoryOrItem = nestedItems ? 'category' : 'item';

  return (
    <Item
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
      id={id}
      isDragging={isDragging}
      nestedItems={nestedItems}
      {...rest}
    />
  );
};

export default SortableItem;
