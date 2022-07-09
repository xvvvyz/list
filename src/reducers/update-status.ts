import { State } from '../types';

interface UpdateStatusAction {
  isLoading?: boolean;
  type: 'UpdateStatus';
}

const updateStatus = (state: State, action: UpdateStatusAction) => ({
  ...state,
  status: {
    isLoading: action.isLoading ?? state.status.isLoading,
  },
});

export default updateStatus;
export type { UpdateStatusAction };
