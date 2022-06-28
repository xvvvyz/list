import * as C from '@chakra-ui/react';
import React, { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ApiContext from '../../../../../../context/api';
import Grabber from '../../../../../../images/grabber.svg';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonX from '../../../../components/IconButtonX';
import conditionalStyles from './utilities/conditional-styles';
import useAutoFocus from './utilities/use-auto-focus';
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
  focusAtPosition?: number;
  id: Id;
  index: number;
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
  updateValue?: string;
}

const ListItem = ({
  category,
  children,
  containerProps,
  defaultValue,
  dragHandleProps,
  focusAtPosition,
  id,
  index,
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
  updateValue,
}: ListItemProps) => {
  const { dispatch } = React.useContext(ApiContext);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  useAutoFocus({ focusAtPosition, ref, updateValue });

  const { containerStyles, focusOrHoverStyles } = conditionalStyles({
    isCategory,
    isDragging,
    isDropzone,
    isOverlay,
  });

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

              switch (e.key) {
                case 'Backspace': {
                  if (target.selectionStart + target.selectionEnd > 0) return;
                  e.preventDefault();

                  dispatch({
                    categoryId: category.id,
                    id,
                    type: isCategory ? 'DeleteCategory' : 'DeleteItem',
                  });

                  if (isCategory) {
                    if (previousCategory) {
                      if (isPreviousCategoryExpanded && previousCategoryLastItem) {
                        const newText = previousCategoryLastItem.text + target.value;

                        return dispatch({
                          id: previousCategoryLastItem.id,
                          meta: { focusAtPosition: previousCategoryLastItem.text.length, updateValue: newText },
                          text: newText,
                          type: 'UpdateItem',
                        });
                      }

                      const newText = previousCategory.text + target.value;

                      dispatch({
                        id: previousCategory.id,
                        meta: { focusAtPosition: previousCategory.text.length, updateValue: newText },
                        text: newText,
                        type: 'UpdateCategory',
                      });
                    }
                  } else {
                    if (previousItem) {
                      const newText = previousItem.text + target.value;

                      return dispatch({
                        id: previousItem.id,
                        meta: { focusAtPosition: previousItem.text.length, updateValue: newText },
                        text: newText,
                        type: 'UpdateItem',
                      });
                    }

                    const newText = category.text + target.value;

                    dispatch({
                      id: category.id,
                      meta: { focusAtPosition: category.text.length, updateValue: newText },
                      text: newText,
                      type: 'UpdateCategory',
                    });
                  }

                  return;
                }

                case 'Enter': {
                  e.preventDefault();
                  const carry = target.value.slice(target.selectionEnd);
                  const newText = target.value.replace(carry, '');

                  if (isCategory) {
                    dispatch({
                      id,
                      meta: { updateValue: newText },
                      text: newText,
                      type: 'UpdateCategory',
                    });

                    if (isCategoryExpanded) {
                      return dispatch({
                        atIndex: 0,
                        categoryId: id,
                        meta: { focusAtPosition: 0 },
                        text: carry,
                        type: 'CreateItem',
                      });
                    }

                    dispatch({
                      atIndex: index + 1,
                      meta: { focusAtPosition: 0 },
                      text: carry,
                      type: 'CreateCategory',
                    });
                  } else {
                    dispatch({
                      id,
                      meta: { updateValue: newText },
                      text: newText,
                      type: 'UpdateItem',
                    });

                    dispatch({
                      atIndex: index + 1,
                      categoryId: category.id,
                      meta: { focusAtPosition: 0 },
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
            ref={ref}
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
