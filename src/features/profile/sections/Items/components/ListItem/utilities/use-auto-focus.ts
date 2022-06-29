import { RefObject, useEffect } from 'react';
import setCaretPosition from './set-caret-position';

const useAutoFocus = ({ focusAtPosition, ref }: { focusAtPosition?: number; ref: RefObject<HTMLDivElement | null> }) =>
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (typeof focusAtPosition !== 'undefined') {
      setCaretPosition(ref.current, focusAtPosition);
    }
  }, [focusAtPosition]);

export default useAutoFocus;
