import * as C from '@chakra-ui/react';
import React from 'react';
import X from '../../../../images/x.svg';

const EditableSubtext = ({ text, ...rest }) => {
  const { isEditing } = C.useEditableControls();
  if (isEditing) return null;

  return (
    <C.Text
      color="fgSecondary"
      fontSize="md"
      fontWeight="normal"
      left={5}
      noOfLines={1}
      pos="absolute"
      {...rest}
    >
      {text}
    </C.Text>
  );
};

const EditableListItem = ({
  inputHeight,
  previewTextHeight,
  subtext,
  subtextOffset,
  text,
  ...rest
}) => {
  const theme = C.useTheme();

  const hideWrappingLinePseudoStyles = {
    bg: 'bgSecondary',
    bottom: 0,
    content: '" "',
    h: subtextOffset,
    left: 0,
    pos: 'absolute',
    transitionDuration: 'normal',
    transitionProperty: 'background',
    w: 'full',
  };

  const focusOrHoverStyles = {
    '.editable-list-item__delete': { opacity: 1, zIndex: 1 },
    '.editable-list-item__preview': { pr: 16 },
  };

  return (
    <C.Box
      _focusWithin={focusOrHoverStyles}
      _hover={focusOrHoverStyles}
      pos="relative"
      w={`calc(100% - ${theme.space['14']})`}
      {...rest}
    >
      <C.Editable pos="relative" submitOnBlur value={text} w="full">
        <C.EditablePreview
          _after={subtext ? hideWrappingLinePseudoStyles : undefined}
          _before={subtext ? hideWrappingLinePseudoStyles : undefined}
          _hover={{
            _after: subtext ? { bg: 'whiteAlpha.50' } : undefined,
            bg: 'whiteAlpha.50',
          }}
          borderRadius="2xl"
          className="editable-list-item__preview"
          h={inputHeight}
          lineHeight={previewTextHeight}
          noOfLines={1}
          pos="relative"
          px={5}
          py={0}
          w="full"
          zIndex={1}
        />
        {subtext && <EditableSubtext bottom={subtextOffset} text={subtext} />}
        <C.EditableInput
          _focus={{ boxShadow: 'none' }}
          borderRadius="2xl"
          h={inputHeight}
          pl={5}
          pr={16}
          w="full"
        />
      </C.Editable>
      <C.IconButton
        aria-label="foo bar"
        boxSize={10}
        className="editable-list-item__delete"
        icon={<C.Icon as={X} boxSize={6} />}
        opacity={0}
        pos="absolute"
        right={2}
        top="50%"
        transform="translateY(-50%)"
        variant="ghost"
        zIndex="-1"
      />
    </C.Box>
  );
};

export default EditableListItem;
