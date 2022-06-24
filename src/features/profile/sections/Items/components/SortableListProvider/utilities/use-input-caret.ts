import React from 'react';
import * as T from '../../../../../../../types';

const useInputCaret = () => {
  const [caretLocation, setCaretLocation] = React.useState<[T.Id, number]>(['', 0]);
  const inputRefs = React.useRef<Record<T.Id, React.RefObject<HTMLTextAreaElement>>>({});

  React.useEffect(() => {
    if (!caretLocation) return;
    const [id, index] = caretLocation;
    const el = inputRefs.current[id]?.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(index, index);
  }, [caretLocation]);

  return { inputRefs, setCaretLocation };
};

export default useInputCaret;
