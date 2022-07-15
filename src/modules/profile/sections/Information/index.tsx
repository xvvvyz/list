import React from 'react';
import size from 'lodash/size';
import Tip from '../../../../components/Tip';
import useAccount from '../../../../hooks/use-account';
import useActiveProfile from '../../../../hooks/use-active-profile';
import useAllCategoryAndItemMap from '../../../../hooks/use-all-category-and-item-map';
import useAllChecklistDenormalized from '../../../../hooks/use-all-checklist-denormalized';

const Information = () => {
  const account = useAccount();
  const activeProfile = useActiveProfile();
  const checklists = useAllChecklistDenormalized();
  const { categoryMap, itemMap } = useAllCategoryAndItemMap();
  if (!account) return null;

  if (!activeProfile) {
    return (
      <Tip>
        add a profile to get started. profiles are containers for related checklists. for&nbsp;example:
        &ldquo;travel&rdquo;
      </Tip>
    );
  }

  if (!size(categoryMap)) {
    return <Tip>add categories to organize your items. for example: &ldquo;id & finance&rdquo;</Tip>;
  }

  if (!size(itemMap)) {
    return (
      <Tip>
        add an item for each thing that you need to remember. for example: &ldquo;passport&rdquo; or &ldquo;$100
        cash&rdquo;
      </Tip>
    );
  }

  if (!size(checklists)) {
    return (
      <Tip>
        add a checklist when you are done adding categories and items. for example: &ldquo;trip to mexico&rdquo;
      </Tip>
    );
  }

  if (!size(activeProfile.tags)) {
    return (
      <Tip>
        type two spaces when editing an item to create a tag. use categories and tags to augment your checklists
      </Tip>
    );
  }

  return null;
};

export default Information;
