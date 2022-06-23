import * as C from '@chakra-ui/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import * as T from '../../../../../../types';
import Grabber from '../../../../../../images/grabber.svg';
import IconButtonChevronExpand from '../../../../../../components/IconButtonChevronExpand';
import IconButtonX from '../../../../../../components/IconButtonX';

interface ItemProps {
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
    role?: string;
    tabIndex: number;
  };
  id: T.Id;
  isActiveDropzone?: boolean;
  isDragging?: boolean;
  isExpanded?: boolean;
  isOverlay?: boolean;
  nestedItems?: React.ReactNode;
  onDelete?: () => void;
  textareaProps: {
    onBackspaceDelete?: ({ carry }: { carry: string }) => void;
    onChange?: ({ value }: { value: string }) => void;
    onEnter?: ({ carry }: { carry: string }) => void;
    ref?: React.RefObject<HTMLTextAreaElement>;
    value: string;
  };
  toggleExpanded?: () => void;
}

const Item = ({
  containerProps,
  dragHandleProps,
  id,
  isActiveDropzone,
  isDragging,
  isExpanded,
  isOverlay,
  nestedItems,
  onDelete,
  textareaProps: { onBackspaceDelete, onChange, onEnter, ref, value },
  toggleExpanded,
}: ItemProps) => {
  const focusOrHoverStyles = {
    '.sortable-item__delete': { opacity: 1, zIndex: 1 },
  };

  const containerStyles = {
    bg: 'initial',
    opacity: '1',
    py: 0,
    shadow: 'none',
  };

  if (isOverlay || isDragging) {
    containerStyles.shadow = 'outline';
  }

  if (isOverlay || isDragging || isActiveDropzone) {
    containerStyles.bg = 'bgPrimary';
  }

  if (isDragging) {
    containerStyles.opacity = '0';
  }

  if (nestedItems) {
    containerStyles.py = 2;
  }

  delete dragHandleProps?.role;

  return (
    <C.Box borderRadius="2xl" id={String(id)} pos="relative" sx={containerStyles} {...containerProps}>
      <C.HStack pr={2}>
        <C.IconButton
          aria-label={dragHandleProps?.['aria-label'] || ''}
          borderRadius="2xl"
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
            onChange={(e) => {
              if (!onChange) return;
              onChange({ value: e.target.value });
            }}
            onKeyDown={(e) => {
              const target = e.target as HTMLTextAreaElement;

              switch (e.code) {
                case 'Backspace': {
                  if (!onDelete || !onBackspaceDelete || target.selectionStart + target.selectionEnd > 0) {
                    return;
                  }

                  e.preventDefault();
                  onDelete();
                  onBackspaceDelete({ carry: value });
                  return;
                }

                case 'Enter': {
                  if (!onEnter) return;
                  e.preventDefault();
                  onEnter({ carry: value.slice(target.selectionEnd) });
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
            value={value}
            variant="unstyled"
          />
          <IconButtonX
            aria-label="foo bar"
            className="sortable-item__delete"
            onClick={() => {
              if (!onDelete) return;
              onDelete();
            }}
          />
        </C.Flex>
        {!!nestedItems && (
          <IconButtonChevronExpand aria-label="foo bar" boxSize={10} isToggled={isExpanded} onToggle={toggleExpanded} />
        )}
      </C.HStack>
      <C.Collapse in={isExpanded}>
        <C.Box pl={5}>{nestedItems}</C.Box>
      </C.Collapse>
    </C.Box>
  );
};

export default Item;
export type { ItemProps };
