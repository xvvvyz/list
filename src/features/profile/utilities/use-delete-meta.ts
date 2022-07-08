import { useContext, useEffect } from 'react';
import DispatchContext from '../../../context/dispatch';

const useDeleteMeta = (when = false) => {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (!when) return;
    dispatch({ type: 'DeleteMeta' });
  }, [when]);
};

export default useDeleteMeta;
