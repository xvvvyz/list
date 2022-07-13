const removeKey = ({ key, obj }: { key: string; obj: Record<string, unknown> }): Record<string, unknown> =>
  Object.keys(obj).reduce((acc, k) => {
    if (k === key) return acc;

    return {
      ...acc,
      [k]:
        typeof obj[k] === 'object' && !Array.isArray(obj[k])
          ? removeKey({
              key,
              obj: obj[k] as Record<string, unknown>,
            })
          : obj[k],
    };
  }, {});

export default removeKey;
