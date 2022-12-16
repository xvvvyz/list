import { AnimatePresence } from 'framer-motion';
import getTip from '../../../../components/Tip/utilities/get-tip';
import useAllCategoryAndItemMap from '../../../../hooks/use-all-category-and-item-map';
import useAllChecklist from '../../../../hooks/use-all-checklist';
import useAllProfile from '../../../../hooks/use-all-profile';

const Tips = () => {
  const checklists = useAllChecklist();
  const profiles = useAllProfile();
  const { categoryMap, itemMap } = useAllCategoryAndItemMap();
  return <AnimatePresence>{getTip({ categoryMap, checklists, itemMap, profiles })}</AnimatePresence>;
};

export default Tips;
