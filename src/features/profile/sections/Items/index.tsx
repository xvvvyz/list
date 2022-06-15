import * as C from '@chakra-ui/react';
import React from 'react';
import Grabber from '../../../../images/grabber.svg';
import Plus from '../../../../images/plus.svg';
import TextareaAutosize from 'react-textarea-autosize';

const Items = ({ categories }) => {
  return (
    <C.Box as="section" mt={12}>
      <C.Heading as="h2" color="fgGhost" px={7} size="lg">
        items
      </C.Heading>
      <C.Box layerStyle="card" mt={5}>
        {categories.map((category) => (
          <C.Box key={category.id}>
            <C.HStack mt={2} spacing={2}>
              <C.IconButton
                aria-label="foo bar"
                h={10}
                icon={<C.Icon as={Grabber} boxSize={6} />}
                variant="ghost"
                w={16}
              />
              <C.Textarea
                as={TextareaAutosize}
                onChange={() => {}}
                resize="none"
                rows={1}
                value={category.text}
                variant="unstyled"
              />
            </C.HStack>
            {category.items.map((item) => (
              <C.HStack key={item.id} pl={5} spacing={2}>
                <C.IconButton
                  aria-label="foo bar"
                  h={10}
                  icon={<C.Icon as={Grabber} boxSize={6} />}
                  variant="ghost"
                  w={16}
                />
                <C.Textarea
                  as={TextareaAutosize}
                  onChange={() => {}}
                  resize="none"
                  rows={1}
                  value={item.text}
                  variant="unstyled"
                />
              </C.HStack>
            ))}
          </C.Box>
        ))}
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
          add category
        </C.Button>
      </C.Box>
    </C.Box>
  );
};

export default Items;
