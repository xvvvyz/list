const parseTags = (values: string[]) => {
  const tags = new Set<string>();
  let count = 1;

  for (const value of values) {
    if (/^x?\d{1,2}x?$/.test(value)) count = Number(value.replace('x', ''));
    else tags.add(value);
  }

  return { count, tags: Array.from(tags) };
};

export default parseTags;
