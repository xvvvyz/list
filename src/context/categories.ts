import { createContext } from 'react';
import { Categories } from '../types';

const CategoriesContext = createContext<Categories>({});

export default CategoriesContext;
