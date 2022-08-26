import * as C from '@chakra-ui/react';
import React from 'react';
import ButtonChevronExpand from '../../../../components/ButtonChevronExpand';
import Checkbox from '../../components/Checkbox';
import IconButtonChevronLeft from '../../../../components/IconButtonChevronLeft';
import useActiveChecklist from '../../../../hooks/use-active-checklist';
import useActiveProfile from '../../../../hooks/use-active-profile';
import useAllCategoryAndItemMap from '../../../../hooks/use-all-category-and-item-map';
import useReplicache from '../../../../hooks/use-replicache';

const Header = () => {
  const activeChecklist = useActiveChecklist();
  const activeProfile = useActiveProfile();
  const configDisclosure = C.useDisclosure();
  const replicache = useReplicache();
  const { categoryMap } = useAllCategoryAndItemMap();
  if (!activeProfile || !activeChecklist) return null;

  return (
    <C.Box as="header" borderTopRadius="none" layerStyle="bgCard">
      <C.HStack justifyContent="space-between" pr={4} pt={5}>
        <IconButtonChevronLeft aria-label="back to profile" h={16} href="/" />
        <C.Heading as="h1">{activeChecklist.text}</C.Heading>
      </C.HStack>
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
              text={categoryMap[categoryId].text}
            />
          ))}
          {!!activeChecklist.availableTags.length && (
            <C.Box p={5}>
              <C.Divider />
            </C.Box>
          )}
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
              text={tag}
            />
          ))}
        </C.Box>
      </C.Collapse>
      <ButtonChevronExpand isToggled={configDisclosure.isOpen} onToggle={configDisclosure.onToggle} w="full" />
    </C.Box>
  );
};

export default Header;
