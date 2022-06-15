import * as C from '@chakra-ui/react';
import React from 'react';
import EditableListItem from '../../components/EditableListItem';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';
import Plus from '../../../../images/plus.svg';

const Checklists = ({ checklists }) => {
  const { isOpen: showAllChecklists, onToggle: onShowAllChecklistsToggle } =
    C.useDisclosure();

  return (
    <C.Box as="section" mt={12}>
      <C.Heading as="h2" color="fgGhost" px={7} size="lg">
        checklists
      </C.Heading>
      <C.Box layerStyle="card" mt={5}>
        <C.Flex>
          <EditableListItem
            fontSize="xl"
            fontWeight="bold"
            inputHeight="5.25rem"
            previewTextHeight="3.6rem"
            subtext={`${checklists[0].itemsCompletedCount} of ${checklists[0].itemsCount} completed`}
            subtextOffset="1rem"
            text={checklists[0].text}
          />
          <IconButtonChevronRight h="5.25rem" label="foo bar" />
        </C.Flex>
        <C.Collapse in={showAllChecklists}>
          <C.SlideFade in={showAllChecklists} offsetY="1rem">
            {checklists.slice(1).map((checklist) => (
              <C.Flex key={checklist.id}>
                <EditableListItem
                  fontSize="xl"
                  fontWeight="bold"
                  inputHeight="5.25rem"
                  previewTextHeight="3.6rem"
                  subtext={`${checklist.itemsCompletedCount} of ${checklist.itemsCount} completed`}
                  subtextOffset="1rem"
                  text={checklist.text}
                />
                <IconButtonChevronRight h="5.25rem" label="foo bar" />
              </C.Flex>
            ))}
          </C.SlideFade>
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
          <IconButtonChevronExpand
            isToggled={showAllChecklists}
            label="foo bar"
            onToggle={onShowAllChecklistsToggle}
          />
        </C.Flex>
      </C.Box>
    </C.Box>
  );
};

export default Checklists;
