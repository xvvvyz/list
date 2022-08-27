import React from 'react';
import Tip from '../index';
import { CategoryAndItemMap } from '../../../queries';
import { Checklist } from '../../../models/checklist';
import { ProfileWithIdAndText } from '../../../models/profile';

const getTip = ({
  categoryMap,
  checklists,
  itemMap,
  profiles,
}: CategoryAndItemMap & { checklists: Checklist[]; profiles: ProfileWithIdAndText[] }) => {
  if (profiles.length > 1) {
    return null;
  }

  if (!profiles.length) {
    return (
      <Tip>
        add a profile to get started. profiles are containers for related checklists. for&nbsp;example:
        &ldquo;travel&rdquo;
      </Tip>
    );
  }

  if (!Object.keys(categoryMap).length) {
    return <Tip>add categories to organize your items. for example: &ldquo;id & finance&rdquo;</Tip>;
  }

  if (!Object.keys(itemMap).length) {
    return (
      <Tip>
        add an item for each thing that you need to remember. for example: &ldquo;passport&rdquo; or &ldquo;$100
        cash&rdquo;
      </Tip>
    );
  }

  if (!Object.values(itemMap).some(({ text }) => text.includes('  '))) {
    return (
      <Tip>
        type two spaces at the end of an item to create a tag. use categories and tags to augment your checklists
      </Tip>
    );
  }

  if (!checklists.length) {
    return (
      <Tip>
        add a checklist when you are done adding categories and items. for example: &ldquo;trip to mexico&rdquo;
      </Tip>
    );
  }

  return null;
};

export default getTip;