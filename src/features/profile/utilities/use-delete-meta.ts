import { useContext, useEffect } from 'react';
import ApiContext from '../../../context/api';

const useDeleteMeta = (when = false) => {
  const { dispatch } = useContext(ApiContext);

  useEffect(() => {
    if (!when) return;
    dispatch({ type: 'DeleteMeta' });
  }, [when]);
};

export default useDeleteMeta;
