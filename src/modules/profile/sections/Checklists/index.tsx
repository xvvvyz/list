import React, { memo } from 'react';
import ChecklistList from './components/ChecklistList';
import useAllChecklist from '../../../../hooks/use-all-checklist';

const Checklists = () => {
  const checklists = useAllChecklist();
  return <ChecklistList checklists={checklists} />;
};

export default memo(Checklists);
