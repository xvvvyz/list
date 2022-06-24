import React from 'react';
import * as T from '../../../../../../../types';
import AccountContext from '../../../../../../../context/account';
import SortableListContext from '../../../context/sortable-list';
import generateId from '../../../../../../../utilities/generate-id';
import { IdPrefix } from '../../../../../../../enums';

const useCreateItem = () => {
  const { setCaretLocation } = React.useContext(SortableListContext);
  const { setCategories, setItems } = React.useContext(AccountContext);

  return ({ atIndex, categoryId, text = '' }: { atIndex: number; categoryId: T.Id; text: string }) => {
    const newItem = { id: generateId(IdPrefix.Item), text };
    setItems((state) => ({ ...state, [newItem.id]: newItem }));

    setCategories((state) => ({
      ...state,
      [categoryId]: {
        ...state[categoryId],
        items: [...state[categoryId].items.slice(0, atIndex), newItem.id, ...state[categoryId].items.slice(atIndex)],
      },
    }));

    setCaretLocation([newItem.id, 0]);
    return newItem;
  };
};

export default useCreateItem;
