import * as C from '@chakra-ui/react';
import React, { HTMLProps, useContext, useRef } from 'react';
import { BoxProps, ButtonProps } from '@chakra-ui/react';
import DispatchContext from '../../../../../../context/dispatch';
import Grabber from '../../../../../../images/grabber.svg';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonX from '../../../../components/IconButtonX';
import generateId from '../../../../../../utilities/generate-id';
import useAutoFocus from '../../../../../../utilities/use-auto-focus';
import { Id } from '../../../../../../types';

interface ListItemProps {
  categoryId: Id;
  children?: React.ReactNode;
  containerProps?: BoxProps & HTMLProps<HTMLDivElement>;
  dragHandleProps?: ButtonProps & HTMLProps<HTMLButtonElement>;
  focusAtPosition?: number;
  id: Id;
  index: number;
  isCategory?: boolean;
  isCategoryExpanded?: boolean;
  isDragging?: boolean;
  isDropzone?: boolean;
  isOverlay?: boolean;
  previousId?: Id;
  previousIsCategory?: boolean;
  previousText?: string;
  setFocusAtPosition: ([id, number]: [Id, number]) => void;
  toggleExpandCategory?: () => void;
  value: string;
}

const ListItem = ({
  categoryId,
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
  previousId,
  previousIsCategory,
  previousText,
  setFocusAtPosition,
  toggleExpandCategory,
  value,
}: ListItemProps) => {
  const dispatch = useContext(DispatchContext);
  const ref = useRef<HTMLDivElement | null>(null);
  useAutoFocus({ focusAtPosition, ref });

  let bg = 'initial';
  if (isOverlay || isDropzone) bg = 'bgSecondaryHover';
  if (isOverlay && !isCategory) bg = 'bgSecondaryActive';

  return (
    <C.Box
      borderRadius="md"
      pos="relative"
      sx={{
        bg,
        fontWeight: isCategory ? 'bold' : 'normal',
        opacity: isDragging ? '0' : '1',
      }}
      {...containerProps}
    >
      <C.Flex alignItems="flex-start">
        <C.IconButton
          aria-label={dragHandleProps?.['aria-label'] || ''}
          icon={<C.Icon as={Grabber} boxSize={6} />}
          sx={{
            '@media (hover: hover)': { _hover: { bg: 'none' } },
            _active: { bg: 'none' },
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
            '@media (hover: hover)': { _hover: { '.sortable-item__delete': { visibility: 'visible' } } },
            _focusWithin: { '.sortable-item__delete': { visibility: 'visible' } },
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
              if (text === '\n') return;
              const parsedText = text.replace(/[\n\r]+/g, '\n');
              if (!/\n/.test(parsedText)) return;
              const [newText, ...carry] = parsedText.split('\n');
              target.innerText = newText;
              let focusId = '';

              dispatch({
                id,
                text: newText,
                type: isCategory ? 'UpdateCategory' : 'UpdateItem',
              });

              carry.forEach((carryText, carryIndex) => {
                focusId = generateId();

                if (isCategory && !isCategoryExpanded) {
                  dispatch({
                    atIndex: index + 1 + carryIndex,
                    id: focusId,
                    text: carryText,
                    type: 'CreateCategory',
                  });
                } else {
                  dispatch({
                    atIndex: isCategoryExpanded ? carryIndex : index + 1 + carryIndex,
                    categoryId,
                    id: focusId,
                    text: carryText,
                    type: 'CreateItem',
                  });
                }
              });

              setFocusAtPosition([focusId, carry.length === 1 ? 0 : carry[carry.length - 1].length]);
            }}
            onKeyDown={(e) => {
              if (e.key !== 'Backspace') return;
              const selection = window.getSelection();
              if (!selection) return;
              const range = selection.getRangeAt(0);
              if (range?.endOffset + range?.startOffset > 0) return;
              e.preventDefault();
              const target = e.target as HTMLDivElement;
              const carry = target.innerText ?? '';

              dispatch({
                categoryId,
                id,
                type: isCategory ? 'DeleteCategory' : 'DeleteItem',
              });

              if (!previousId || typeof previousText !== 'string') return;

              dispatch({
                id: previousId,
                text: previousText + carry,
                type: previousIsCategory ? 'UpdateCategory' : 'UpdateItem',
              });

              setFocusAtPosition([previousId, previousText.length]);
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
                categoryId,
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
