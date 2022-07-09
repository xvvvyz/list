import { createContext } from 'react';
import { Status } from '../types';

const statusInitialState = { isLoading: true };
const StatusContext = createContext<Status>(statusInitialState);

export default StatusContext;
export { statusInitialState };
