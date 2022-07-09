import { createContext } from 'react';
import { Items } from '../types';

const itemsInitialState = {};
const ItemsContext = createContext<Items>(itemsInitialState);

export default ItemsContext;
export { itemsInitialState };
