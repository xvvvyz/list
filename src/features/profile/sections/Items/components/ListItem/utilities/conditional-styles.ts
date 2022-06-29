const conditionalStyles = ({
  isCategory,
  isDragging,
  isDropzone,
  isOverlay,
}: {
  isCategory?: boolean;
  isDragging?: boolean;
  isDropzone?: boolean;
  isOverlay?: boolean;
}) => {
  const focusOrHoverStyles = {
    '.sortable-item__delete': { opacity: 1, zIndex: 1 },
  };

  const containerStyles = {
    bg: 'initial',
    opacity: '1',
    py: 0,
    shadow: 'none',
  };

  if (isOverlay) {
    containerStyles.bg = isCategory ? 'hover' : 'active';
  }

  if (isDropzone) {
    containerStyles.bg = 'hover';
  }

  if (isDragging) {
    containerStyles.opacity = '0';
  }

  if (isCategory) {
    containerStyles.py = 2;
  }

  return { containerStyles, focusOrHoverStyles };
};

export default conditionalStyles;
