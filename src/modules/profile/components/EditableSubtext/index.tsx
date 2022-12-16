import * as C from '@chakra-ui/react';

const EditableSubtext = (props: C.TextProps) => {
  const { isEditing } = C.useEditableControls();
  if (isEditing) return null;

  return (
    <C.Text color="fgSecondary" fontSize="base" fontWeight="normal" left={5} noOfLines={1} pos="absolute" {...props} />
  );
};

export default EditableSubtext;
