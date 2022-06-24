import * as C from '@chakra-ui/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import * as T from '../../../../../../../../types';
import AccountContext from '../../../../../../../../context/account';
import Grabber from '../../../../../../../../images/grabber.svg';
import IconButtonChevronExpand from '../../../../../../../../components/IconButtonChevronExpand';
import IconButtonX from '../../../../../../../../components/IconButtonX';
import SortableListContext from '../../../../context/sortable-list';
import useConditionalStyles from './utilities/use-conditional-styles';
import useOnChange from './utilities/use-on-change';
import useOnDelete from './utilities/on-delete';
import useOnKeyDown from './utilities/use-on-key-down';
import useToggleExpandCategory from './utilities/use-toggle-expand-category';

interface ItemProps {
  categoryId: T.Id;
  children?: React.ReactNode;
  containerProps?: {
    ref: React.RefCallback<HTMLElement>;
    transform: string | undefined;
    transition: string | undefined;
  };
  dragHandleProps?: {
    'aria-describedby': string;
    'aria-disabled': boolean;
    'aria-label': string;
    'aria-pressed': boolean | undefined;
    'aria-roledescription': string;
    ref: React.RefCallback<HTMLElement>;
    role: string;
    tabIndex: number;
  };
  index: number;
  isDragging?: boolean;
  isOverlay?: boolean;
  itemId?: T.Id;
}

const Item = ({
  categoryId,
  children,
  containerProps,
  dragHandleProps,
  index,
  isDragging,
  isOverlay,
  itemId,
}: ItemProps) => {
  const { categories, items } = React.useContext(AccountContext);
  const { isCategoryExpanded, textareaRefs } = React.useContext(SortableListContext);

  const id = itemId || categoryId;
  const value = itemId ? items[itemId].text : categories[categoryId].text;

  const onChange = useOnChange({ categoryId, itemId });
  const onDelete = useOnDelete({ categoryId, itemId });
  const onKeyDown = useOnKeyDown({ categoryId, index, itemId, value });
  const toggleExpandCategory = useToggleExpandCategory({ categoryId });

  const { containerStyles, focusOrHoverStyles } = useConditionalStyles({
    categoryId,
    isDragging,
    isOverlay,
    itemId,
  });

  if (!isOverlay) textareaRefs.current[id] = React.createRef();

  return (
    <C.Box borderRadius="md" id={id} pos="relative" sx={containerStyles} {...containerProps}>
      <C.HStack pr={2}>
        <C.IconButton
          aria-label={dragHandleProps?.['aria-label'] || ''}
          borderRadius="md"
          color="fgSecondary"
          cursor="move"
          display="inline-flex"
          flexShrink={0}
          h={10}
          icon={<C.Icon as={Grabber} boxSize={6} />}
          variant="unstyled"
          w={14}
          {...dragHandleProps}
        />
        <C.Flex _focusWithin={focusOrHoverStyles} _hover={focusOrHoverStyles} pos="relative" w="full">
          <C.Textarea
            _focus={{ boxShadow: 'none' }}
            as={TextareaAutosize}
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={textareaRefs.current[id]}
            resize="none"
            rows={1}
            value={value}
            variant="unstyled"
          />
          <IconButtonX aria-label="foo bar" className="sortable-item__delete" onClick={onDelete} />
        </C.Flex>
        {!!children && (
          <IconButtonChevronExpand
            aria-label="foo bar"
            boxSize={10}
            isToggled={isCategoryExpanded[categoryId]}
            onToggle={toggleExpandCategory}
          />
        )}
      </C.HStack>
      <C.Collapse in={isCategoryExpanded[categoryId]}>
        <C.Box pl={5}>{children}</C.Box>
      </C.Collapse>
    </C.Box>
  );
};

export default Item;
export type { ItemProps };
