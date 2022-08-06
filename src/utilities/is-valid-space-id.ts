import { IdChars, IdSize } from '../enums';

const isValidSpaceId = (spaceId: unknown) =>
  typeof spaceId === 'string' && new RegExp(`^[${IdChars.Default}]{${IdSize.SpaceId}}$`).test(spaceId);

export default isValidSpaceId;
