import { createContext } from 'react';
import { Checklists } from '../types';

const ChecklistsContext = createContext<{
  checklists: Checklists;
}>({
  checklists: {},
});

export default ChecklistsContext;
