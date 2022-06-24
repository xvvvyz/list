import React from 'react';
import * as T from '../../../../../../../../../types';
import AccountContext from '../../../../../../../../../context/account';

const useOnChange = ({ categoryId, itemId }: { categoryId: T.Id; itemId?: T.Id }) => {
  const { setCategories, setItems } = React.useContext(AccountContext);

  return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (itemId) {
      setItems((state) => ({
        ...state,
        [itemId]: { ...state[itemId], text: e.target.value },
      }));

      return;
    }

    setCategories((state) => ({
      ...state,
      [categoryId]: { ...state[categoryId], text: e.target.value },
    }));
  };
};

export default useOnChange;
