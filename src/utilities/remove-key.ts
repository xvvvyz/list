import { GenericObject } from '../types';

const removeKey = ({ key, obj }: { key: string; obj: GenericObject }): GenericObject =>
  Object.keys(obj).reduce((acc, k) => {
    if (k === key) return acc;

    return {
      ...acc,
      [k]:
        typeof obj[k] === 'object' && !Array.isArray(obj[k])
          ? removeKey({
              key,
              obj: obj[k] as GenericObject,
            })
          : obj[k],
    };
  }, {});

export default removeKey;
