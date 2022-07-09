import { createContext } from 'react';
import { Categories } from '../types';

const categoriesInitialState = {};
const CategoriesContext = createContext<Categories>(categoriesInitialState);

export default CategoriesContext;
export { categoriesInitialState };
