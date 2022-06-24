import React from 'react';
import * as T from '../../../../../../../types';

const useTextareaCaret = () => {
  const [caretLocation, setCaretLocation] = React.useState<[T.Id, number]>(['', 0]);
  const textareaRefs = React.useRef<Record<T.Id, React.RefObject<HTMLTextAreaElement>>>({});

  React.useEffect(() => {
    if (!caretLocation) return;
    const [id, index] = caretLocation;
    const el = textareaRefs.current[id]?.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(index, index);
  }, [caretLocation]);

  return { setCaretLocation, textareaRefs };
};

export default useTextareaCaret;
