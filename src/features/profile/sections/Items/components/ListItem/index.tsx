import * as C from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import DispatchContext from '../../../../../../context/dispatch';
import Grabber from '../../../../../../images/grabber.svg';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonX from '../../../../components/IconButtonX';
import useAutoFocus from './utilities/use-auto-focus';
import useDeleteMeta from '../../../../utilities/use-delete-meta';
import { Category, Id, Item } from '../../../../../../types';

interface ListItemProps {
  category: Category;
  children?: React.ReactNode;
  containerProps?: {
    ref: React.RefCallback<HTMLElement>;
    transform: string | undefined;
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
  const dispatch = useContext(DispatchContext);
  const ref = useRef<HTMLDivElement | null>(null);
  useAutoFocus({ focusAtPosition, ref });
  useDeleteMeta(typeof focusAtPosition !== 'undefined');

  const focusOrHoverStyles = {
    '.sortable-item__delete': {
      visibility: 'visible',
    },
  };

  const containerStyles = {
    bg: 'initial',
    fontWeight: isCategory ? 'bold' : 'normal',
    opacity: isDragging ? '0' : '1',
  };

  if (isOverlay) {
    containerStyles.bg = isCategory ? 'bgSecondaryHover' : 'bgSecondaryActive';
  }

  if (isDropzone) {
    containerStyles.bg = 'bgSecondaryHover';
  }

  return (
    <C.Box borderRadius="md" pos="relative" sx={containerStyles} {...containerProps}>
      <C.Flex alignItems="flex-start">
        <C.IconButton
          aria-label={dragHandleProps?.['aria-label'] || ''}
          icon={<C.Icon as={Grabber} boxSize={6} />}
          sx={{
            '@media (hover: hover)': {
              _hover: {
                bg: 'none',
              },
            },
            _active: {
              bg: 'none',
            },
            borderRadius: 'md',
            color: 'fgSecondary',
            cursor: 'move',
            display: 'inline-flex',
            flexShrink: 0,
            h: isCategory ? 14 : 10,
            w: 14,
          }}
          variant="ghost"
          {...dragHandleProps}
        />
        <C.Flex
          sx={{
            '@media (hover: hover)': {
              _hover: focusOrHoverStyles,
            },
            _focusWithin: focusOrHoverStyles,
            pos: 'relative',
            w: 'full',
          }}
        >
          <C.Box
            aria-label={isCategory ? 'category' : 'item'}
            aria-multiline
            className="sortable-item__text"
            contentEditable
            onBlur={(e) =>
              dispatch({
                id,
                text: e.target.textContent ?? '',
                type: isCategory ? 'UpdateCategory' : 'UpdateItem',
              })
            }
            onInput={(e) => {
              const target = e.target as HTMLDivElement;
              const text = target.innerText;
              const [match] = /[\n\r]+/.exec(text) || [];
              if (!match) return;
              const [newText, ...carry] = text.split(match);
              target.innerText = newText;

              if (isCategory) {
                dispatch({
                  id,
                  text: newText,
                  type: 'UpdateCategory',
                });

                if (isCategoryExpanded) {
                  return carry.forEach((c) =>
                    dispatch({
                      atIndex: 0,
                      categoryId: id,
                      meta: { focusAtPosition: 0 },
                      text: c,
                      type: 'CreateItem',
                    })
                  );
                }

                return carry.forEach((c) =>
                  dispatch({
                    atIndex: index + 1,
                    meta: { focusAtPosition: 0 },
                    text: c,
                    type: 'CreateCategory',
                  })
                );
              }

              dispatch({
                id,
                text: newText,
                type: 'UpdateItem',
              });

              carry.forEach((c) =>
                dispatch({
                  atIndex: index + 1,
                  categoryId: category.id,
                  meta: { focusAtPosition: 0 },
                  text: c,
                  type: 'CreateItem',
                })
              );
            }}
            onKeyDown={(e) => {
              if (e.key !== 'Backspace') return;
              const target = e.target as HTMLDivElement;
              const text = target.innerText ?? '';
              const selection = window.getSelection();
              if (!selection) return;
              const range = selection.getRangeAt(0);
              if (range?.endOffset + range?.startOffset > 0) return;
              e.preventDefault();

              dispatch({
                categoryId: category.id,
                id,
                type: isCategory ? 'DeleteCategory' : 'DeleteItem',
              });

              if (isCategory) {
                if (previousCategory) {
                  if (isPreviousCategoryExpanded && previousCategoryLastItem) {
                    return dispatch({
                      id: previousCategoryLastItem.id,
                      meta: { focusAtPosition: previousCategoryLastItem.text.length },
                      text: previousCategoryLastItem.text + text,
                      type: 'UpdateItem',
                    });
                  }

                  return dispatch({
                    id: previousCategory.id,
                    meta: { focusAtPosition: previousCategory.text.length },
                    text: previousCategory.text + text,
                    type: 'UpdateCategory',
                  });
                }

                return;
              }

              if (previousItem) {
                return dispatch({
                  id: previousItem.id,
                  meta: { focusAtPosition: previousItem.text.length },
                  text: previousItem.text + text,
                  type: 'UpdateItem',
                });
              }

              return dispatch({
                id: category.id,
                meta: { focusAtPosition: category.text.length },
                text: category.text + text,
                type: 'UpdateCategory',
              });
            }}
            ref={ref}
            role="textbox"
            suppressContentEditableWarning
            sx={{
              _focus: { outline: 'none' },
              WebkitUserSelect: 'text',
              lineHeight: 'short',
              minH: isCategory ? 14 : 10,
              pos: 'relative',
              px: 2,
              py: isCategory ? 4 : 2,
              userSelect: 'text',
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
            mr={isCategory ? 0 : 2}
            mt={isCategory ? 2 : 0}
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
          <IconButtonChevronExpand boxSize={14} isToggled={isCategoryExpanded} onToggle={toggleExpandCategory} />
        )}
      </C.Flex>
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
