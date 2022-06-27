import removeKey from '../utilities/remove-key';
import { GenericObject } from '../types';
import { State } from '../reducer';

interface DeleteMetaAction {
  type: 'DeleteMeta';
}

const deleteMeta = (state: State) =>
  removeKey({
    key: 'meta',
    obj: state as unknown as GenericObject,
  }) as unknown as State;

export default deleteMeta;
export type { DeleteMetaAction };
