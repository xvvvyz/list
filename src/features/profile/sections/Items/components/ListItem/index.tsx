import * as C from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import ApiContext from '../../../../../../context/api';
import Grabber from '../../../../../../images/grabber.svg';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonX from '../../../../components/IconButtonX';
import conditionalStyles from './utilities/conditional-styles';
import getSelectionRange from './utilities/get-selection-range';
import useAutoFocus from './utilities/use-auto-focus';
import useDeleteMeta from '../../../../utilities/use-delete-meta';
import { Category, Id, Item } from '../../../../../../types';

interface ListItemProps {
  category: Category;
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
  value: string;
}

const ListItem = ({
  category,
  children,
  containerProps,
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
  value,
}: ListItemProps) => {
  const { dispatch } = useContext(ApiContext);
  const ref = useRef<HTMLDivElement | null>(null);
  useAutoFocus({ focusAtPosition, ref });
  useDeleteMeta(typeof focusAtPosition !== 'undefined');

  const { containerStyles, focusOrHoverStyles } = conditionalStyles({
    isCategory,
    isDragging,
    isDropzone,
    isOverlay,
  });

  return (
    <C.Box borderRadius="md" pos="relative" sx={containerStyles} {...containerProps}>
      <C.HStack alignItems="flex-start" pr={2}>
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
          <C.Box
            aria-label={isCategory ? 'category' : 'item'}
            aria-multiline
            contentEditable
            onBlur={(e) =>
              dispatch({
                id,
                text: e.target.textContent ?? '',
                type: isCategory ? 'UpdateCategory' : 'UpdateItem',
              })
            }
            onKeyDown={(e) => {
              const target = e.target as HTMLDivElement;
              const text = target.textContent ?? '';
              const [selectionStart, selectionEnd] = getSelectionRange(text.length);

              switch (e.key) {
                case 'Backspace': {
                  if (selectionStart + selectionEnd > 0) return;
                  e.preventDefault();

                  dispatch({
                    categoryId: category.id,
                    id,
                    type: isCategory ? 'DeleteCategory' : 'DeleteItem',
                  });

                  if (isCategory) {
                    if (previousCategory) {
                      if (isPreviousCategoryExpanded && previousCategoryLastItem) {
                        const newText = previousCategoryLastItem.text + text;

                        return dispatch({
                          id: previousCategoryLastItem.id,
                          meta: { focusAtPosition: previousCategoryLastItem.text.length },
                          text: newText,
                          type: 'UpdateItem',
                        });
                      }

                      const newText = previousCategory.text + text;

                      dispatch({
                        id: previousCategory.id,
                        meta: { focusAtPosition: previousCategory.text.length },
                        text: newText,
                        type: 'UpdateCategory',
                      });
                    }
                  } else {
                    if (previousItem) {
                      const newText = previousItem.text + text;

                      return dispatch({
                        id: previousItem.id,
                        meta: { focusAtPosition: previousItem.text.length },
                        text: newText,
                        type: 'UpdateItem',
                      });
                    }

                    const newText = category.text + text;

                    dispatch({
                      id: category.id,
                      meta: { focusAtPosition: category.text.length },
                      text: newText,
                      type: 'UpdateCategory',
                    });
                  }

                  return;
                }

                case 'Enter': {
                  e.preventDefault();
                  const carry = text.slice(selectionEnd);
                  const newText = text.replace(carry, '');

                  if (isCategory) {
                    dispatch({
                      id,
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
            spellCheck
            suppressContentEditableWarning
            sx={{
              _focus: { boxShadow: 'none' },
              lineHeight: 'short',
              minH: 10,
              pos: 'relative',
              py: 2,
              w: 'full',
              whiteSpace: 'pre-wrap',
              wordWrap: 'anywhere',
            }}
            tabIndex={0}
          >
            {value}
          </C.Box>
          <IconButtonX
            aria-label="delete"
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
          <IconButtonChevronExpand boxSize={10} isToggled={isCategoryExpanded} onToggle={toggleExpandCategory} />
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
