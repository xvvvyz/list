import React from 'react';
import * as T from '../../../../../../../../../types';
import AccountContext from '../../../../../../../../../context/account';

const useOnDelete = ({ categoryId, itemId }: { categoryId: T.Id; itemId?: T.Id }) => {
  const { activeProfile, setCategories, setProfiles } = React.useContext(AccountContext);

  return () => {
    if (itemId) {
      setCategories((state) => ({
        ...state,
        [categoryId]: {
          ...state[categoryId],
          items: state[categoryId].items.filter((i) => i !== itemId),
        },
      }));

      return;
    }

    if (!activeProfile) return;

    setProfiles((state) => ({
      ...state,
      [activeProfile.id]: {
        ...state[activeProfile.id],
        categories: state[activeProfile.id].categories.filter((c) => c !== categoryId),
      },
    }));
  };
};

export default useOnDelete;
