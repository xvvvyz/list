import * as C from '@chakra-ui/react';
import React from 'react';
import EditableListItem from '../../components/EditableListItem';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';
import Plus from '../../../../images/plus.svg';

const Checklists = ({
  activeProfileId,
  checklists,
  setChecklistsMap,
  setProfilesMap,
}) => {
  const { isOpen: showAllChecklists, onToggle: onShowAllChecklistsToggle } =
    C.useDisclosure();

  if (!activeProfileId) return null;

  return (
    <C.Box as="section" mt={12}>
      <C.Heading as="h2" color="fgGhost" px={7} size="lg">
        checklists
      </C.Heading>
      <C.Box layerStyle="card" mt={5}>
        {!!checklists.length && (
          <C.Flex>
            <EditableListItem
              fontSize="xl"
              fontWeight="bold"
              inputHeight="5.25rem"
              onChange={(value) =>
                setChecklistsMap((checklistsMap) => ({
                  ...checklistsMap,
                  [checklists[0].id]: {
                    ...checklistsMap[checklists[0].id],
                    text: value,
                  },
                }))
              }
              onDelete={() =>
                setProfilesMap((profilesMap) => ({
                  ...profilesMap,
                  [activeProfileId]: {
                    ...profilesMap[activeProfileId],
                    checklists: profilesMap[activeProfileId].checklists.filter(
                      (id) => id !== checklists[0].id
                    ),
                  },
                }))
              }
              previewTextHeight="3.6rem"
              subtext={`${checklists[0].itemsCompletedCount} of ${checklists[0].itemsCount} completed`}
              subtextOffset="1rem"
              value={checklists[0].text}
            />
            <IconButtonChevronRight h="5.25rem" label="foo bar" />
          </C.Flex>
        )}
        <C.Collapse in={showAllChecklists}>
          {checklists.slice(1).map((checklist) => (
            <C.Flex key={checklist.id}>
              <EditableListItem
                fontSize="xl"
                fontWeight="bold"
                inputHeight="5.25rem"
                onChange={(value) =>
                  setChecklistsMap((checklistsMap) => ({
                    ...checklistsMap,
                    [checklist.id]: {
                      ...checklistsMap[checklist.id],
                      text: value,
                    },
                  }))
                }
                onDelete={() =>
                  setProfilesMap((profilesMap) => ({
                    ...profilesMap,
                    [activeProfileId]: {
                      ...profilesMap[activeProfileId],
                      checklists: profilesMap[
                        activeProfileId
                      ].checklists.filter((id) => id !== checklist.id),
                    },
                  }))
                }
                previewTextHeight="3.6rem"
                subtext={`${checklist.itemsCompletedCount} of ${checklist.itemsCount} completed`}
                subtextOffset="1rem"
                value={checklist.text}
              />
              <IconButtonChevronRight h="5.25rem" label="foo bar" />
            </C.Flex>
          ))}
        </C.Collapse>
        <C.Flex>
          <C.Button
            h={14}
            iconSpacing={6}
            justifyContent="flex-start"
            leftIcon={<C.Icon as={Plus} boxSize={6} />}
            pl={4}
            pr={5}
            variant="ghost"
            w="full"
          >
            add checklist
          </C.Button>
          {checklists.length > 1 && (
            <IconButtonChevronExpand
              isToggled={showAllChecklists}
              label="foo bar"
              onToggle={onShowAllChecklistsToggle}
            />
          )}
        </C.Flex>
      </C.Box>
    </C.Box>
  );
};

export default Checklists;
