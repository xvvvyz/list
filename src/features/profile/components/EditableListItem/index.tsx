import * as C from '@chakra-ui/react';
import React from 'react';
import IconButtonX from '../IconButtonX';

const EditableSubtext = (props: C.TextProps) => {
  const { isEditing } = C.useEditableControls();
  if (isEditing) return null;

  return (
    <C.Text color="fgSecondary" fontSize="md" fontWeight="normal" left={5} noOfLines={1} pos="absolute" {...props} />
  );
};

interface EditableListItemProps extends Omit<C.BoxProps, 'onSubmit'> {
  defaultValue: string;
  inputHeight: string;
  onDelete: () => void;
  onSubmit: (value: string) => void;
  previewTextHeight: string;
  startWithEditView?: boolean;
  subtext?: string;
  subtextOffset?: string;
}

const EditableListItem = ({
  defaultValue,
  inputHeight,
  onDelete,
  onSubmit,
  previewTextHeight,
  startWithEditView,
  subtext,
  subtextOffset,
  ...rest
}: EditableListItemProps) => {
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
      __css={{ pos: 'relative', w: `calc(100% - ${theme.space['14']})` }}
      _focusWithin={focusOrHoverStyles}
      _hover={focusOrHoverStyles}
      {...rest}
    >
      <C.Editable
        defaultValue={defaultValue}
        onSubmit={onSubmit}
        pos="relative"
        startWithEditView={startWithEditView}
        submitOnBlur
        w="full"
      >
        <C.EditablePreview
          _after={subtext ? hideWrappingLinePseudoStyles : undefined}
          _before={subtext ? hideWrappingLinePseudoStyles : undefined}
          _hover={{
            _after: subtext ? { bg: 'whiteAlpha.50' } : undefined,
            bg: 'whiteAlpha.50',
          }}
          borderRadius="md"
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
        {subtext && <EditableSubtext bottom={subtextOffset}>{subtext}</EditableSubtext>}
        <C.EditableInput _focus={{ boxShadow: 'none' }} borderRadius="md" h={inputHeight} pl={5} pr={16} w="full" />
      </C.Editable>
      <IconButtonX
        aria-label="foo bar"
        className="editable-list-item__delete"
        onClick={onDelete}
        pos="absolute"
        right={2}
        top="50%"
        transform="translateY(-50%)"
        zIndex="-1"
      />
    </C.Box>
  );
};

export default EditableListItem;
export type { EditableListItemProps };
