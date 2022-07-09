import removeKey from '../utilities/remove-key';
import { GenericObject, State } from '../types';

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
