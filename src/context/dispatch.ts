import { createContext, Dispatch } from 'react';
import { noop } from '@chakra-ui/utils';
import { Action } from '../reducer';

const DispatchContext = createContext<Dispatch<Action>>(noop);

export default DispatchContext;
