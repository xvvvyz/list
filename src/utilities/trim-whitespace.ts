const trimWhitespace = (text: string) => text.replace(/ {2,}/g, '  ').trim();

export default trimWhitespace;
