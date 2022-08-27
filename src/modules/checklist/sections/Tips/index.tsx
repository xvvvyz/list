import React from 'react';
import { AnimatePresence } from 'framer-motion';
import getTip from './utilities/get-tip';
import useActiveChecklist from '../../../../hooks/use-active-checklist';

const Tips = () => {
  const activeChecklist = useActiveChecklist();
  return <AnimatePresence>{getTip({ activeChecklist })}</AnimatePresence>;
};

export default Tips;
