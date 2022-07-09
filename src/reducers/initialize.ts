import { State } from '../types';

interface InitializeAction {
  state: State;
  type: 'Initialize';
}

const initialize = (state: State, action: InitializeAction) => ({
  ...state,
  ...action.state,
  status: {
    ...state.status,
    isLoading: false,
  },
});

export default initialize;
export type { InitializeAction };
