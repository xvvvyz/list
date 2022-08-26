import React from 'react';
import Tip from '../../../../components/Tip';
import useActiveChecklist from '../../../../hooks/use-active-checklist';

const Tips = () => {
  const activeChecklist = useActiveChecklist();

  if (!activeChecklist || activeChecklist.categories.length) {
    return null;
  }

  return (
    <Tip>this checklist doesn&rsquo;t have any items&mdash;try adding some categories and tags from the dropdown</Tip>
  );
};

export default Tips;
