import * as C from '@chakra-ui/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ApiContext from '../../../../../../context/api';
import Grabber from '../../../../../../images/grabber.svg';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonX from '../../../../components/IconButtonX';
import conditionalStyles from './utilities/conditional-styles';
import { Category, Id, Item } from '../../../../../../types';

interface ListItemProps {
  category: Category;
  children?: React.ReactNode;
  containerProps?: {
    ref: React.RefCallback<HTMLElement>;
    transform: string | undefined;
    transition: string | undefined;
  };
  defaultValue: string;
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
  id: Id;
  index: number;
  inputRefs?: React.MutableRefObject<Record<Id, React.RefObject<HTMLTextAreaElement>>>;
  isCategory?: boolean;
  isDragging?: boolean;
  isDropzone?: boolean;
  isCategoryExpanded?: boolean;
  isOverlay?: boolean;
  isPreviousCategoryExpanded?: boolean;
  previousCategory?: Category;
  previousCategoryLastItem?: Item;
  previousItem?: Item;
  toggleExpandCategory?: () => void;
}

const ListItem = ({
  category,
  children,
  containerProps,
  defaultValue,
  dragHandleProps,
  id,
  index,
  inputRefs,
  isCategory,
  isCategoryExpanded,
  isDragging,
  isDropzone,
  isOverlay,
  isPreviousCategoryExpanded,
  previousCategory,
  previousCategoryLastItem,
  previousItem,
  toggleExpandCategory,
}: ListItemProps) => {
  const { dispatch } = React.useContext(ApiContext);

  const { containerStyles, focusOrHoverStyles } = conditionalStyles({
    isCategory,
    isDragging,
    isDropzone,
    isOverlay,
  });

  if (inputRefs) inputRefs.current[id] = React.createRef();

  return (
    <C.Box borderRadius="md" pos="relative" sx={containerStyles} {...containerProps}>
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
            defaultValue={defaultValue}
            onBlur={(e) =>
              dispatch({
                id,
                text: e.target.value,
                type: isCategory ? 'UpdateCategory' : 'UpdateItem',
              })
            }
            onKeyDown={(e) => {
              const target = e.target as HTMLTextAreaElement;

              switch (e.code) {
                case 'Backspace': {
                  if (target.selectionStart + target.selectionEnd > 0) {
                    return;
                  }

                  e.preventDefault();

                  dispatch({
                    categoryId: category.id,
                    id,
                    type: isCategory ? 'DeleteCategory' : 'DeleteItem',
                  });

                  if (isCategory) {
                    if (!previousCategory) return;

                    if (isPreviousCategoryExpanded && previousCategoryLastItem) {
                      const newText = previousCategoryLastItem.text + target.value;

                      dispatch({
                        id: previousCategoryLastItem.id,
                        text: newText,
                        type: 'UpdateItem',
                      });

                      return;
                    }

                    const newText = previousCategory.text + target.value;

                    dispatch({
                      id: previousCategory.id,
                      text: newText,
                      type: 'UpdateCategory',
                    });
                  } else {
                    if (previousItem) {
                      const newText = previousItem.text + target.value;

                      dispatch({
                        id: previousItem.id,
                        text: newText,
                        type: 'UpdateItem',
                      });

                      return;
                    }

                    if (!previousCategory) return;
                    const newText = previousCategory.text + target.value;

                    dispatch({
                      id: category.id,
                      text: newText,
                      type: 'UpdateCategory',
                    });
                  }

                  return;
                }

                case 'Enter': {
                  e.preventDefault();
                  const carry = target.value.slice(target.selectionEnd);

                  if (isCategory) {
                    dispatch({
                      id,
                      text: target.value.replace(carry, ''),
                      type: 'UpdateCategory',
                    });

                    if (isCategoryExpanded) {
                      dispatch({
                        atIndex: 0,
                        categoryId: id,
                        text: carry,
                        type: 'CreateItem',
                      });

                      return;
                    }

                    dispatch({
                      atIndex: index + 1,
                      text: carry,
                      type: 'CreateCategory',
                    });
                  } else {
                    dispatch({
                      id,
                      text: target.value.replace(carry, ''),
                      type: 'UpdateItem',
                    });

                    dispatch({
                      atIndex: index + 1,
                      categoryId: category.id,
                      text: carry,
                      type: 'CreateItem',
                    });
                  }

                  return;
                }

                default: {
                  // noop
                }
              }
            }}
            ref={inputRefs ? inputRefs.current[id] : undefined}
            resize="none"
            rows={1}
            variant="unstyled"
          />
          <IconButtonX
            aria-label="foo bar"
            className="sortable-item__delete"
            onClick={() =>
              dispatch({
                categoryId: category.id,
                id,
                type: isCategory ? 'DeleteCategory' : 'DeleteItem',
              })
            }
          />
        </C.Flex>
        {isCategory && (
          <IconButtonChevronExpand
            aria-label="foo bar"
            boxSize={10}
            isToggled={isCategoryExpanded}
            onToggle={toggleExpandCategory}
          />
        )}
      </C.HStack>
      {isCategory && (
        <C.Collapse in={isCategoryExpanded}>
          <C.Box pl={5}>{children}</C.Box>
        </C.Collapse>
      )}
    </C.Box>
  );
};

export default ListItem;
export type { ListItemProps };
