import * as C from '@chakra-ui/react';
import { useEffect } from 'react';
import ButtonChevronExpand from '../../../../components/ButtonChevronExpand';
import IconButtonChevronLeft from '../../../../components/IconButtonChevronLeft';
import useActiveChecklist from '../../../../hooks/use-active-checklist';
import useActiveProfile from '../../../../hooks/use-active-profile';
import useAllCategoryAndItemMap from '../../../../hooks/use-all-category-and-item-map';
import useReplicache from '../../../../hooks/use-replicache';
import CheckCircle from '../../../../images/check-circle.svg';
import Copy from '../../../../images/copy.svg';
import Share from '../../../../images/share.svg';
import Tag from '../../../profile/components/Tag';
import Checkbox from '../../components/Checkbox';

const Header = () => {
  const activeChecklist = useActiveChecklist();
  const activeProfile = useActiveProfile();
  const configDisclosure = C.useDisclosure();
  const replicache = useReplicache();
  const { categoryMap } = useAllCategoryAndItemMap();
  const { hasCopied, onCopy, setValue } = C.useClipboard('');
  const previousIncludeCategoryIdsLength = C.usePrevious(activeChecklist?.includeCategoryIds?.length ?? 0);
  const previousIncludeTagsLength = C.usePrevious(activeChecklist?.includeTags?.length ?? 0);

  useEffect(() => {
    if (
      !activeChecklist ||
      (activeChecklist.includeCategoryIds.length === previousIncludeCategoryIdsLength &&
        activeChecklist.includeTags.length === previousIncludeTagsLength)
    ) {
      return;
    }

    let markdown = '';

    for (const category of activeChecklist.categories) {
      markdown += `\n**${category.text}**\n\n`;

      for (let i = 0; i < category.items.length; i++) {
        const item = category.items[i];
        let count = 0;

        while (category.items[i + 1]?.text === item.text) {
          count++;
          i++;
        }

        markdown += `- ${item.text}${count ? `  \`${count + 1}x\`` : ''}\n`;
      }
    }

    setValue(markdown.trim() || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, [activeChecklist, previousIncludeCategoryIdsLength, previousIncludeTagsLength, setValue]);

  if (!activeProfile || !activeChecklist) return null;

  return (
    <C.Box as="header" borderTopRadius="none" layerStyle="bgCard">
      <C.Flex justifyContent="space-between" pt={5}>
        <IconButtonChevronLeft aria-label="back to profile" h={16} href="/" />
        <C.Heading alignItems="center" as="h1" display="flex" px={2} py={4} textAlign="center">
          {activeChecklist.text}
        </C.Heading>
        <C.Menu autoSelect={false} closeOnSelect={false}>
          <C.MenuButton
            aria-label="share"
            as={C.IconButton}
            flexShrink={0}
            h={16}
            icon={<C.Icon as={Share} boxSize={6} />}
            variant="ghost"
            w={14}
          />
          <C.MenuList>
            <C.MenuItem icon={<C.Icon as={hasCopied ? CheckCircle : Copy} />} onClick={onCopy}>
              {hasCopied ? 'copied! share it with friends' : 'copy checklist as markdown'}
            </C.MenuItem>
          </C.MenuList>
        </C.Menu>
      </C.Flex>
      <C.Collapse in={configDisclosure.isOpen}>
        <C.Box py={3}>
          {!activeProfile.categoryIds.length && (
            <C.Text color="fgSecondary" textAlign="center">
              no categories or tags available
            </C.Text>
          )}
          {activeProfile.categoryIds.map((categoryId) => (
            <Checkbox
              isChecked={activeChecklist.includeCategoryIds.includes(categoryId)}
              key={`include-category-${categoryId}`}
              onChange={async (e) => {
                if (!replicache) return;

                await replicache.mutate[e.target.checked ? 'addChecklistCategoryId' : 'removeChecklistCategoryId']({
                  categoryId,
                  checklistId: activeChecklist.id,
                });
              }}
            >
              {categoryMap[categoryId].text}
            </Checkbox>
          ))}
          {activeChecklist.availableTags.map((tag) => (
            <Checkbox
              isChecked={activeChecklist.includeTags.includes(tag)}
              key={`include-tag-${tag}`}
              onChange={async (e) => {
                if (!replicache) return;

                await replicache.mutate[e.target.checked ? 'addChecklistTag' : 'removeChecklistTag']({
                  checklistId: activeChecklist.id,
                  tag,
                });
              }}
            >
              <Tag>{tag}</Tag>
            </Checkbox>
          ))}
        </C.Box>
      </C.Collapse>
      <ButtonChevronExpand isToggled={configDisclosure.isOpen} onToggle={configDisclosure.onToggle} w="full" />
    </C.Box>
  );
};

export default Header;
