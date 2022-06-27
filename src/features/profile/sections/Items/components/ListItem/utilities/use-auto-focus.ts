import { RefObject, useEffect } from 'react';

const useAutoFocus = ({
  focusAtPosition,
  ref,
  updateValue,
}: {
  focusAtPosition?: number;
  ref: RefObject<HTMLTextAreaElement | null>;
  updateValue?: string;
}) =>
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (typeof updateValue !== 'undefined') {
      ref.current.value = updateValue;
    }

    if (typeof focusAtPosition !== 'undefined') {
      ref.current.focus();
      ref.current.setSelectionRange(focusAtPosition, focusAtPosition);
    }
  }, [focusAtPosition, updateValue]);

export default useAutoFocus;
