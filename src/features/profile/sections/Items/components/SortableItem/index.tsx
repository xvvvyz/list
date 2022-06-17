import * as DS from '@dnd-kit/sortable';
import * as C from '@chakra-ui/react';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import Grabber from '../../../../../../images/grabber.svg';

const SortableItem = ({ id, item, nested, ...rest }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = DS.useSortable({
    id,
  });

  return (
    <C.Box
      bg={isDragging ? 'bgSecondary' : undefined}
      borderRadius="2xl"
      pos="relative"
      ref={setNodeRef}
      shadow={isDragging ? 'outline' : undefined}
      transform={CSS.Translate.toString(transform)}
      transition={transition}
      zIndex={isDragging ? 1 : undefined}
      {...attributes}
      {...rest}
      tabIndex={-1}
    >
      <C.HStack spacing={2}>
        <C.IconButton
          aria-label="foo bar"
          borderRadius="2xl"
          color="fgSecondary"
          cursor="move"
          display="inline-flex"
          h={10}
          icon={<C.Icon as={Grabber} boxSize={6} />}
          variant="unstyled"
          w={16}
          {...listeners}
        />
        {item}
      </C.HStack>
      {nested}
    </C.Box>
  );
};

export default SortableItem;
