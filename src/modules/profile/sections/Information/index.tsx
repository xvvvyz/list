import React from 'react';
import Tip from '../../../../components/Tip';
import useAccount from '../../../../hooks/use-account';
import useAllCategoryAndItemMap from '../../../../hooks/use-all-category-and-item-map';
import useAllChecklistDenormalized from '../../../../hooks/use-all-checklist-denormalized';
import useAllProfile from '../../../../hooks/use-all-profile';

const Information = () => {
  const account = useAccount();
  const checklists = useAllChecklistDenormalized();
  const profiles = useAllProfile();
  const { categoryMap, itemMap } = useAllCategoryAndItemMap();

  if (profiles.length > 1) {
    return null;
  }

  if (!account || !profiles.length) {
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

export default Information;
