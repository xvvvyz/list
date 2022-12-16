import * as C from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import ButtonChevronExpand from '../../../../components/ButtonChevronExpand';
import useActiveChecklist from '../../../../hooks/use-active-checklist';
import useReplicache from '../../../../hooks/use-replicache';
import { ChecklistItem } from '../../../../models/checklist';
import Checkbox from '../../components/Checkbox';

const Items = () => {
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<Record<string, boolean>>({});
  const activeChecklist = useActiveChecklist();
  const replicache = useReplicache();
  if (!activeChecklist || !activeChecklist.categories.length) return null;

  return (
    <C.Box
      aria-label="items"
      as="section"
      layerStyle="bgCard"
      mt={12}
      sx={{ '.chakra-collapse:last-of-type': { '.chakra-checkbox:last-of-type': { mb: 2 } } }}
    >
      {activeChecklist.categories.map((category) => (
        <Fragment key={category.id}>
          <ButtonChevronExpand
            isToggled={isCategoryExpanded[category.id]}
            onToggle={() => setIsCategoryExpanded((state) => ({ ...state, [category.id]: !state[category.id] }))}
          >
            <C.HStack justifyContent="space-between" pr={5} spacing={7} w="full">
              <C.Text as="span" color="fgPrimary" fontWeight="bold">
                {category.text}
              </C.Text>
              <C.Text as="span">
                {category.itemsCompletedCount}/{category.items.length}
              </C.Text>
            </C.HStack>
          </ButtonChevronExpand>
          <C.Collapse in={isCategoryExpanded[category.id]}>
            {category.items.map((item) => (
              <Checkbox
                isChecked={(item as ChecklistItem).completed}
                key={item.id}
                onChange={async (e) => {
                  if (!replicache) return;

                  await replicache.mutate[e.target.checked ? 'checkItem' : 'uncheckItem']({
                    checklistId: activeChecklist.id,
                    itemId: item.id,
                  });
                }}
              >
                <C.Flex justifyContent="space-between" w="full">
                  <C.Text as="span" color="inherit">
                    {item.text}
                  </C.Text>
                  {!!item.number && (
                    <C.Text as="span" color="fgSecondary" textAlign="center" w={6}>
                      {item.number}
                    </C.Text>
                  )}
                </C.Flex>
              </Checkbox>
            ))}
          </C.Collapse>
        </Fragment>
      ))}
    </C.Box>
  );
};

export default Items;
