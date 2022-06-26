import { createContext, Dispatch } from 'react';
import { noop } from '@chakra-ui/utils';
import { Action } from '../reducer';

const ApiContext = createContext<{
  dispatch: Dispatch<Action>;
}>({
  dispatch: noop,
});

export default ApiContext;
