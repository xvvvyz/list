import * as C from '@chakra-ui/react';
import React from 'react';
import Grabber from '../../../../../../images/grabber.svg';
import IconButtonChevronExpand from '../../../../../../components/IconButtonChevronExpand';
import IconButtonX from '../../../../components/IconButtonX';
import TextareaAutosize from 'react-textarea-autosize';

const Item = React.forwardRef(
  (
    {
      dragHandleProps,
      inputRef,
      isActiveContainer,
      isDragging,
      isExpanded,
      isOverlay,
      item,
      nested,
      onBackspaceDelete,
      onChange,
      onDelete,
      onEnter,
      toggleExpanded,
      value,
      ...rest
    },
    ref
  ) => {
    const focusOrHoverStyles = {
      '.sortable-item__delete': { opacity: 1, zIndex: 1 },
    };

    const containerStyles = {};

    if (isOverlay || isDragging) {
      containerStyles.shadow = 'outline';
    }

    if (isOverlay || isDragging || isActiveContainer) {
      containerStyles.bg = 'bgPrimary';
    }

    if (isDragging) {
      containerStyles.opacity = '0';
    }

    if (nested) {
      containerStyles.py = 2;
    }

    return (
      <C.Box
        borderRadius="2xl"
        pos="relative"
        ref={ref}
        sx={containerStyles}
        {...rest}
      >
        <C.HStack pr={2}>
          <C.IconButton
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
          <C.Flex
            _focusWithin={focusOrHoverStyles}
            _hover={focusOrHoverStyles}
            pos="relative"
            w="full"
          >
            <C.Textarea
              _focus={{ boxShadow: 'none' }}
              as={TextareaAutosize}
              onChange={onChange}
              onKeyDown={(e) => {
                switch (e.code) {
                  case 'Backspace': {
                    if (
                      e.target.selectionStart > 0 ||
                      e.target.selectionEnd > 0
                    ) {
                      return;
                    }

                    e.preventDefault();
                    onBackspaceDelete({ carry: value });
                    return;
                  }

                  case 'Enter': {
                    e.preventDefault();
                    onEnter({ carry: value.slice(e.target.selectionEnd) });
                    return;
                  }

                  default: {
                    // noop
                  }
                }
              }}
              ref={inputRef}
              resize="none"
              rows={1}
              value={value}
              variant="unstyled"
            />
            <IconButtonX
              className="sortable-item__delete"
              label="foo bar"
              onClick={onDelete}
            />
          </C.Flex>
          {!!nested && (
            <IconButtonChevronExpand
              boxSize={10}
              isToggled={isExpanded}
              label="foo bar"
              onToggle={toggleExpanded}
            />
          )}
        </C.HStack>
        <C.Collapse in={isExpanded}>
          <C.Box pl={5}>{nested}</C.Box>
        </C.Collapse>
      </C.Box>
    );
  }
);

export default Item;
