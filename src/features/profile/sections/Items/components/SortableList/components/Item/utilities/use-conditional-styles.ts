import React from 'react';
import * as T from '../../../../../../../../../types';
import SortableListContext from '../../../../../context/sortable-list';

const useConditionalStyles = ({
  categoryId,
  isDragging,
  isOverlay,
  itemId,
}: {
  categoryId: T.Id;
  isDragging?: boolean;
  isOverlay?: boolean;
  itemId?: T.Id;
}) => {
  const { overCategoryId } = React.useContext(SortableListContext);

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

  if (isOverlay || isDragging || (!itemId && overCategoryId === categoryId)) {
    containerStyles.bg = 'bgPrimary';
  }

  if (isDragging) {
    containerStyles.opacity = '0';
  }

  if (!itemId) {
    containerStyles.py = 2;
  }

  return { containerStyles, focusOrHoverStyles };
};

export default useConditionalStyles;
