import { createContext } from 'react';
import { Checklists } from '../types';

const ChecklistsContext = createContext<Checklists>({});

export default ChecklistsContext;
