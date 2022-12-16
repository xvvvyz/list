import { AnimatePresence } from 'framer-motion';
import useActiveChecklist from '../../../../hooks/use-active-checklist';
import getTip from './utilities/get-tip';

const Tips = () => {
  const activeChecklist = useActiveChecklist();
  return <AnimatePresence>{getTip({ activeChecklist })}</AnimatePresence>;
};

export default Tips;
