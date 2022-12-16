import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ListItem, { ListItemProps } from '../ListItem';

const SortableListItem = ({ id, ...rest }: ListItemProps) => {
  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform } = useSortable({
    animateLayoutChanges: defaultAnimateLayoutChanges,
    id,
  });

  return (
    <ListItem
      containerProps={{
        ref: setNodeRef,
        transform: CSS.Translate.toString(transform),
      }}
      dragHandleProps={{
        ...attributes,
        ...listeners,
        'aria-label': 'sort',
        'aria-roledescription': 'sortable',
        ref: setActivatorNodeRef,
      }}
      id={id}
      isDragging={isDragging}
      {...rest}
    />
  );
};

export default SortableListItem;
