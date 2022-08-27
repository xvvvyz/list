import tagRegex from './tag-regex';

const splitByTagDelimiter = (text: string) => text.split(tagRegex);

export default splitByTagDelimiter;
