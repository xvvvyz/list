import { customAlphabet } from 'nanoid';
import { IdPrefix } from '../enums';
import { Id } from '../types';

const generateId = (prefix: IdPrefix): Id =>
  `${prefix}#${customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8)()}`;

export default generateId;
