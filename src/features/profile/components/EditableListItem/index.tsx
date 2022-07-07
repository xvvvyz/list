import * as C from '@chakra-ui/react';
import React from 'react';
import IconButtonX from '../IconButtonX';
import useDeleteMeta from '../../utilities/use-delete-meta';

const EditableSubtext = (props: C.TextProps) => {
  const { isEditing } = C.useEditableControls();
  if (isEditing) return null;

  return (
    <C.Text color="fgSecondary" fontSize="base" fontWeight="normal" left={5} noOfLines={1} pos="absolute" {...props} />
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
  useDeleteMeta(startWithEditView);

  return (
    <C.Box
      __css={{
        '&:hover, &:focus-within': {
          '.editable-list-item__delete': { opacity: 1, zIndex: 1 },
          '.editable-list-item__preview': { pr: 16 },
        },
        pos: 'relative',
        w: `calc(100% - ${theme.space['14']})`,
      }}
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
          _after={
            subtext
              ? {
                  bg: 'bgSecondary',
                  bottom: 0,
                  content: '" "',
                  h: subtextOffset,
                  left: 0,
                  pos: 'absolute',
                  w: 'full',
                }
              : undefined
          }
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
        <C.EditableInput
          _focus={{ boxShadow: 'none' }}
          borderRadius="md"
          h={inputHeight}
          pl={5}
          pr={16}
          type="text"
          w="full"
        />
      </C.Editable>
      <IconButtonX
        aria-label="delete"
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
