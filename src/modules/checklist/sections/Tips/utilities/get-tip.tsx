import React from 'react';
import Tip from '../../../../../components/Tip';
import { ChecklistDenormalized } from '../../../../../models/checklist';

const getTip = ({ activeChecklist }: { activeChecklist: ChecklistDenormalized | null }) => {
  if (!activeChecklist || activeChecklist.categories[0]?.items?.length) {
    return null;
  }

  return (
    <Tip>this checklist doesn&rsquo;t have any items&mdash;try adding some categories and tags from the dropdown</Tip>
  );
};

export default getTip;
