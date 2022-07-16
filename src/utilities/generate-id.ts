import { customAlphabet } from 'nanoid';

const generateId = (size = 12) =>
  customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', size)();

export default generateId;
