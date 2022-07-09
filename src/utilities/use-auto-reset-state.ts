import React, { useEffect, useState } from 'react';

const useAutoResetState = <T>(defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    if (JSON.stringify(defaultValue) === JSON.stringify(state)) return;
    setState(defaultValue);
  }, [state]);

  return [state, setState];
};

export default useAutoResetState;
