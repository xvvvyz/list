import * as C from '@chakra-ui/react';
import { Checklist } from '../../../models/checklist';
import { ProfileWithIdAndText } from '../../../models/profile';
import Tag from '../../../modules/profile/components/Tag';
import { CategoryAndItemMap } from '../../../queries';
import splitByTagDelimiterFiltered from '../../../utilities/split-by-tag-delimiter-filtered';
import Tip from '../index';

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
    return (
      <Tip>
        add categories to organize your items. for example: &ldquo;before leaving&rdquo;, &ldquo;id & finance&rdquo;,
        &ldquo;photography&rdquo;
      </Tip>
    );
  }

  if (!Object.keys(itemMap).length) {
    return (
      <Tip>
        add an item for each thing that you need to remember. for example: &ldquo;phone&rdquo;, &ldquo;laptop&rdquo;,
        &ldquo;socks&rdquo;
      </Tip>
    );
  }

  if (!Object.values(itemMap).some(({ text }) => splitByTagDelimiterFiltered(text).length > 1)) {
    return (
      <Tip>
        <C.Text as="span" display="block">
          type <C.Kbd>space</C.Kbd>+<C.Kbd>space</C.Kbd> or <C.Kbd>space</C.Kbd>+<C.Kbd>#</C.Kbd> at the end of an item
          to create a tag. tags augment your checklists
        </C.Text>
        <C.Text as="span" display="block" mt={5}>
          some tags have special behavior in the checklist view. try <Tag>3x</Tag>, <Tag>x4</Tag>, <Tag>5</Tag> etc. to
          specify an amount
        </C.Text>
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
