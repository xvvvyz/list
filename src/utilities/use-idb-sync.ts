import { noop } from '@chakra-ui/utils';
import { update } from 'idb-keyval';
import { useEffect } from 'react';

const useIdbSync = ({ key, skip, value }: { key: string; skip: boolean; value: object }) =>
  useEffect(() => {
    if (skip) return;
    update(key, (prev) => ({ ...prev, ...value })).then(noop);
  }, [value]);

export default useIdbSync;
