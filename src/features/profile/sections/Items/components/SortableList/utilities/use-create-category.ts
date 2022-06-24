import React from 'react';
import * as T from '../../../../../../../types';
import AccountContext from '../../../../../../../context/account';
import SortableListContext from '../../../context/sortable-list';
import generateId from '../../../../../../../utilities/generate-id';
import { IdPrefix } from '../../../../../../../enums';

const useCreateCategory = () => {
  const { activeProfile, setCategories, setProfiles } = React.useContext(AccountContext);
  const { setCaretLocation } = React.useContext(SortableListContext);

  return ({ atIndex, text = '' }: { atIndex: number; text: string }): T.Category | null => {
    if (!activeProfile) return null;

    const newCategory = {
      id: generateId(IdPrefix.Category),
      items: [],
      text,
    };

    setCategories((state) => ({
      ...state,
      [newCategory.id]: newCategory,
    }));

    setProfiles((state) => ({
      ...state,
      [activeProfile.id]: {
        ...state[activeProfile.id],
        categories: [
          ...state[activeProfile.id].categories.slice(0, atIndex),
          newCategory.id,
          ...state[activeProfile.id].categories.slice(atIndex),
        ],
      },
    }));

    setCaretLocation([newCategory.id, 0]);
    return newCategory;
  };
};

export default useCreateCategory;
