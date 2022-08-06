import { customAlphabet } from 'nanoid';
import { IdChars, IdSize } from '../enums';

const generateId = (size = IdSize.Default) => customAlphabet(IdChars.Default, size)();

export default generateId;
