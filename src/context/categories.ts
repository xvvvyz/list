import { createContext } from 'react';
import { Categories } from '../types';

const CategoriesContext = createContext<{
  categories: Categories;
}>({
  categories: {},
});

export default CategoriesContext;
