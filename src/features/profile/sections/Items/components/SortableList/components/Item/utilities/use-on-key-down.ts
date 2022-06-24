import React from 'react';
import * as T from '../../../../../../../../../types';
import AccountContext from '../../../../../../../../../context/account';
import SortableListContext from '../../../../../context/sortable-list';
import useCreateCategory from '../../../utilities/use-create-category';
import useCreateItem from '../../../utilities/use-create-item';
import useOnDelete from './on-delete';

const useOnKeyDown = ({
  categoryId,
  index,
  itemId,
  value,
}: {
  categoryId: T.Id;
  index: number;
  itemId?: T.Id;
  value: string;
}) => {
  const createCategory = useCreateCategory();
  const createItem = useCreateItem();
  const onDelete = useOnDelete({ categoryId, itemId });
  const { activeProfile, categories, items, setCategories, setItems } = React.useContext(AccountContext);
  const { isCategoryExpanded, setCaretLocation } = React.useContext(SortableListContext);

  const onBackspaceItem = () => {
    const previousItemId = categories[categoryId].items[index - 1];

    if (previousItemId) {
      setItems((state) => ({
        ...state,
        [previousItemId]: {
          ...state[previousItemId],
          text: state[previousItemId].text + value,
        },
      }));

      setCaretLocation([previousItemId, items[previousItemId].text.length]);
      return;
    }

    setCategories((state) => ({
      ...state,
      [categoryId]: {
        ...state[categoryId],
        text: state[categoryId].text + value,
      },
    }));

    setCaretLocation([categoryId, categories[categoryId].text.length]);
  };

  const onBackspaceCategory = () => {
    if (!activeProfile) return;
    const previousCategoryId = activeProfile.categories[index - 1]?.id;
    if (!previousCategoryId) return;

    if (isCategoryExpanded[previousCategoryId]) {
      const previousCategoryLastItemId =
        categories[previousCategoryId].items[categories[previousCategoryId].items.length - 1];

      setItems((state) => ({
        ...state,
        [previousCategoryLastItemId]: {
          ...state[previousCategoryLastItemId],
          text: state[previousCategoryLastItemId].text + value,
        },
      }));

      setCaretLocation([previousCategoryLastItemId, items[previousCategoryLastItemId].text.length]);
      return;
    }

    setCategories((state) => ({
      ...state,
      [previousCategoryId]: {
        ...state[previousCategoryId],
        text: state[previousCategoryId].text + value,
      },
    }));

    setCaretLocation([previousCategoryId, categories[previousCategoryId].text.length]);
  };

  const onEnterItem = ({ carry }: { carry: string }) => {
    if (!itemId) return;

    setItems((state) => ({
      ...state,
      [itemId]: {
        ...state[itemId],
        text: state[itemId].text.replace(carry, ''),
      },
    }));

    createItem({
      atIndex: index + 1,
      categoryId,
      text: carry,
    });
  };

  const onEnterCategory = ({ carry }: { carry: string }) => {
    setCategories((state) => ({
      ...state,
      [categoryId]: {
        ...state[categoryId],
        text: state[categoryId].text.replace(carry, ''),
      },
    }));

    if (isCategoryExpanded[categoryId]) {
      createItem({
        atIndex: 0,
        categoryId: categoryId,
        text: carry,
      });

      return;
    }

    createCategory({ atIndex: index + 1, text: carry });
  };

  return (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;

    switch (e.code) {
      case 'Backspace': {
        if (target.selectionStart + target.selectionEnd > 0) return;
        e.preventDefault();
        if (itemId) onBackspaceItem();
        else onBackspaceCategory();
        onDelete();
        return;
      }

      case 'Enter': {
        e.preventDefault();
        const carry = value.slice(target.selectionEnd);
        if (itemId) onEnterItem({ carry });
        else onEnterCategory({ carry });
        return;
      }

      default: {
        // noop
      }
    }
  };
};

export default useOnKeyDown;
