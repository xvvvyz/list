import { createContext } from 'react';
import { Items } from '../types';

const ItemsContext = createContext<{
  items: Items;
}>({
  items: {},
});

export default ItemsContext;
