import { createContext } from 'react';
import { Checklists } from '../types';

const checklistsInitialState = {};
const ChecklistsContext = createContext<Checklists>(checklistsInitialState);

export default ChecklistsContext;
export { checklistsInitialState };
