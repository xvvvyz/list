import flatten from 'lodash/flatten';
import Tip from '../../../../../components/Tip';
import { ChecklistDenormalized } from '../../../../../models/checklist';

const getTip = ({ activeChecklist }: { activeChecklist: ChecklistDenormalized | null }) => {
  if (!activeChecklist || flatten(activeChecklist.categories.map((c) => c.items)).length) {
    return null;
  }

  return (
    <Tip>this checklist doesn&rsquo;t have any items&mdash;try adding some categories and tags from the dropdown</Tip>
  );
};

export default getTip;
