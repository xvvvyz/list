import * as C from '@chakra-ui/react';
import EditableSubtext from '../EditableSubtext';
import IconButtonX from '../IconButtonX';

interface EditableListItemProps extends Omit<C.BoxProps, 'onSubmit'> {
  inputHeight: string;
  onDelete: () => void;
  onSubmit: (value: string) => void;
  previewTextHeight: string;
  startWithEditView?: boolean;
  subtext?: string;
  subtextOffset?: string;
  value: string;
}

const EditableListItem = ({
  inputHeight,
  onDelete,
  onSubmit,
  previewTextHeight,
  startWithEditView,
  subtext,
  subtextOffset,
  value,
  ...rest
}: EditableListItemProps) => {
  const theme = C.useTheme();

  const focusOrHoverStyles = {
    '.editable-list-item__delete': { visibility: 'visible' },
    '.editable-list-item__preview': { pr: 14 },
  };

  return (
    <C.Box
      __css={{
        '@media (hover: hover)': { _hover: focusOrHoverStyles },
        _focusWithin: focusOrHoverStyles,
        pos: 'relative',
        w: `calc(100% - ${theme.space['14']})`,
      }}
      {...rest}
    >
      <C.Editable defaultValue={value} onSubmit={onSubmit} startWithEditView={startWithEditView} submitOnBlur w="full">
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
          pr={14}
          type="text"
          w="full"
        />
      </C.Editable>
      <IconButtonX
        aria-label="delete"
        className="editable-list-item__delete"
        onClick={onDelete}
        pos="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
      />
    </C.Box>
  );
};

export default EditableListItem;
export type { EditableListItemProps };
