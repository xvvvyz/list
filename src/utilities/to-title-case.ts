const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (subStr: string) => subStr.charAt(0).toUpperCase() + subStr.slice(1).toLowerCase());

export default toTitleCase;
