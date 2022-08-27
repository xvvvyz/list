import splitByTagDelimiter from './split-by-tag-delimiter';
import tagRegex from './tag-regex';

const splitByTagDelimiterFiltered = (text: string) =>
  splitByTagDelimiter(text).filter((delimiter) => !tagRegex.test(delimiter));

export default splitByTagDelimiterFiltered;
