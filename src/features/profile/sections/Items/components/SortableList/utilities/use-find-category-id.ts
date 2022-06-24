import * as D from '@dnd-kit/core';
import React from 'react';
import * as T from '../../../../../../../types';
import AccountContext from '../../../../../../../context/account';

const useFindCategoryId = () => {
  const { activeProfile } = React.useContext(AccountContext);

  return (id: D.UniqueIdentifier): T.Id => {
    if (!activeProfile) return '';
    return activeProfile.categories.find((c) => c.id === id || c.items.some((i) => i.id === id))?.id || '';
  };
};

export default useFindCategoryId;
