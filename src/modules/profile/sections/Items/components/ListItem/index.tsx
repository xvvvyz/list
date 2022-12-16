import * as C from '@chakra-ui/react';
import React, { HTMLProps, useEffect, useRef } from 'react';
import ButtonChevronExpand from '../../../../../../components/ButtonChevronExpand';
import useReplicache from '../../../../../../hooks/use-replicache';
import Grabber from '../../../../../../images/grabber.svg';
import generateId from '../../../../../../utilities/generate-id';
import setCaretPosition from '../../../../../../utilities/set-caret-position';
import splitByTagDelimiter from '../../../../../../utilities/split-by-tag-delimiter';
import tagRegex from '../../../../../../utilities/tag-regex';
import IconButtonX from '../../../../components/IconButtonX';
import Tag from '../../../../components/Tag';

interface ListItemProps {
  categoryId: string;
  children?: React.ReactNode;
  containerProps?: C.BoxProps & HTMLProps<HTMLDivElement>;
  dragHandleProps?: C.ButtonProps & HTMLProps<HTMLButtonElement>;
  focusAtPosition?: number;
  id: string;
  index: number;
  isCategory?: boolean;
  isCategoryExpanded?: boolean;
  isDragging?: boolean;
  isDropzone?: boolean;
  isOverlay?: boolean;
  previousId?: string;
  previousIsCategory?: boolean;
  previousText?: string;
  setFocusAtPosition: ([id, number]: [string, number]) => void;
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
  const ref = useRef<HTMLDivElement | null>(null);
  const replicache = useReplicache();

  useEffect(() => {
    if (!ref.current || typeof focusAtPosition === 'undefined') return;
    setCaretPosition(ref.current, focusAtPosition);
    setFocusAtPosition(['', 0]);
  }, [focusAtPosition, setFocusAtPosition]);

  let bg = 'initial';
  if (isOverlay || isDropzone) bg = 'bgSecondaryHover';
  if (isOverlay && !isCategory) bg = 'bgSecondaryActive';

  return (
    <C.Box borderRadius="md" pos="relative" sx={{ bg, opacity: isDragging ? '0' : '1' }} {...containerProps}>
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
            pos: 'relative',
            w: 14,
          }}
          variant="ghost"
          {...dragHandleProps}
        />
        <C.Flex
          sx={{
            '@media (hover: hover)': { _hover: { '.item__delete': { visibility: 'visible' } } },
            _focusWithin: { '.item__delete': { visibility: 'visible' }, '.item__tag-underlay': { display: 'none' } },
            w: 'full',
          }}
        >
          <C.Box
            sx={{
              '.item__content, .item__tag-underlay': {
                _focus: { outline: 'none' },
                fontVariantLigatures: 'none',
                fontWeight: isCategory ? 'bold' : 'normal',
                lineHeight: 'shorter',
                minH: isCategory ? 14 : 10,
                px: 2,
                py: isCategory ? 4 : 2,
                w: 'full',
                whiteSpace: 'pre-wrap',
                wordWrap: 'anywhere',
              },
              pos: 'relative',
              w: 'full',
            }}
          >
            <C.Box
              aria-label={isCategory ? 'category' : 'item'}
              aria-multiline
              className="item__content"
              contentEditable
              onBlur={async (e) => {
                if (!replicache) return;

                await replicache.mutate[isCategory ? 'updateCategory' : 'updateItem']({
                  id,
                  text: e.target.textContent ?? '',
                });
              }}
              onInput={async (e) => {
                if (!replicache) return;
                const target = e.target as HTMLDivElement;
                const text = target.innerText.replace(/\n$/, '');
                if (!/\n/.test(text)) return;
                const [newText, ...carry] = text.split(/\n+/g);
                target.innerHTML = newText;

                await replicache.mutate[isCategory ? 'updateCategory' : 'updateItem']({
                  id,
                  text: newText,
                });

                await Promise.all(
                  carry.map((carryText, carryIndex) => {
                    const focusId = generateId();
                    setFocusAtPosition([focusId, carry.length === 1 ? 0 : carry[carry.length - 1].length]);

                    if (isCategory && !isCategoryExpanded) {
                      return replicache.mutate.createCategory({
                        accountId: replicache.name,
                        atIndex: index + 1 + carryIndex,
                        id: focusId,
                        text: carryText,
                      });
                    } else {
                      return replicache.mutate.createItem({
                        atIndex: isCategoryExpanded ? carryIndex : index + 1 + carryIndex,
                        categoryId,
                        id: focusId,
                        text: carryText,
                      });
                    }
                  })
                );
              }}
              onKeyDown={async (e) => {
                if (!replicache || e.key !== 'Backspace') return;
                const selection = window.getSelection();
                if (!selection) return;
                const range = selection.getRangeAt(0);
                if (range.endOffset + range.startOffset > 0) return;
                e.preventDefault();
                const target = e.target as HTMLDivElement;
                const carry = target.innerText ?? '';
                target.remove();

                if (previousId && typeof previousText === 'string') {
                  await replicache.mutate[previousIsCategory ? 'updateCategory' : 'updateItem']({
                    id: previousId,
                    text: previousText + carry,
                  });

                  setFocusAtPosition([previousId, previousText.length]);
                }

                if (isCategory) {
                  await replicache.mutate.deleteCategory({
                    accountId: replicache.name,
                    id,
                  });
                } else {
                  await replicache.mutate.deleteItem({
                    categoryId,
                    id,
                  });
                }
              }}
              ref={ref}
              role="textbox"
              spellCheck={false}
              suppressContentEditableWarning
              sx={{
                WebkitUserSelect: 'text',
                pos: 'relative',
                userSelect: 'text',
                zIndex: 2,
              }}
              tabIndex={0}
            >
              {value}
            </C.Box>
            {!isCategory && (
              <C.Box
                aria-hidden
                className="item__tag-underlay"
                sx={{
                  color: 'transparent',
                  left: 0,
                  pos: 'absolute',
                  top: 0,
                }}
              >
                {splitByTagDelimiter(value).map((text, i) => (
                  <span key={`${id}-${i}`}>{i && !tagRegex.test(text) ? <Tag>{text}</Tag> : text}</span>
                ))}
              </C.Box>
            )}
          </C.Box>
          <IconButtonX
            aria-label="delete"
            className="item__delete"
            mr={isCategory ? 0 : 2}
            mt={isCategory ? 2 : 0}
            onClick={async () => {
              if (!replicache) return;

              if (isCategory) {
                await replicache.mutate.deleteCategory({
                  accountId: replicache.name,
                  id,
                });
              } else {
                await replicache.mutate.deleteItem({
                  categoryId,
                  id,
                });
              }
            }}
          />
        </C.Flex>
        {isCategory && (
          <ButtonChevronExpand boxSize={14} isToggled={isCategoryExpanded} onToggle={toggleExpandCategory} />
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
