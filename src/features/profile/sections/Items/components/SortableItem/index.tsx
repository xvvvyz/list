import * as DS from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import Item from '../Item';

const SortableItem = ({ id, nested, ...rest }) => {
  const {
    attributes: accessibilityAttributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = DS.useSortable({
    animateLayoutChanges: DS.defaultAnimateLayoutChanges,
    data: { isContainer: true },
    id,
  });

  delete accessibilityAttributes.role;

  const categoryOrItem = nested ? 'category' : 'item';

  accessibilityAttributes[
    'aria-roledescription'
  ] = `sortable ${categoryOrItem}`;

  return (
    <Item
      dragHandleProps={{
        ref: setActivatorNodeRef,
        ...accessibilityAttributes,
        ...listeners,
      }}
      id={id}
      isDragging={isDragging}
      nested={nested}
      ref={setNodeRef}
      transform={CSS.Translate.toString(transform)}
      transition={transition}
      {...rest}
    />
  );
};

export default SortableItem;
