import { customAlphabet } from 'nanoid';
import { Id } from '../types';
import { IdPrefix } from '../enums';

const generateId = (prefix: IdPrefix): Id =>
  `${prefix}#${customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8)()}`;

export default generateId;
