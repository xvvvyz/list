import React, { useEffect, useState } from 'react';

const useEphemeralState = <T>(defaultValue: T, duration = 100): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    if (JSON.stringify(defaultValue) === JSON.stringify(state)) return;
    setTimeout(() => setState(defaultValue), duration);
  }, [defaultValue, duration, state]);

  return [state, setState];
};

export default useEphemeralState;
