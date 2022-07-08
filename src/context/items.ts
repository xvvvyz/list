import { createContext } from 'react';
import { Items } from '../types';

const ItemsContext = createContext<Items>({});

export default ItemsContext;
