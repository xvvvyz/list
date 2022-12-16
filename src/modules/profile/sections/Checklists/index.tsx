import { memo } from 'react';
import useActiveProfile from '../../../../hooks/use-active-profile';
import useAllChecklist from '../../../../hooks/use-all-checklist';
import ChecklistList from './components/ChecklistList';

const Checklists = () => {
  const activeProfile = useActiveProfile();
  const checklists = useAllChecklist();
  if (!activeProfile) return null;
  return <ChecklistList checklists={checklists} />;
};

export default memo(Checklists);
