import * as C from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import Check from '../images/check.svg';
import ChevronRight from '../images/chevron-right.svg';
import Logo from '../images/logo.svg';

const WhatPage = () => (
  <C.Container maxW="container.what" pb={24} textAlign="center">
    <C.Box as="header">
      <C.HStack justify="space-between" pt={8}>
        <C.Heading as="h1">
          <C.VisuallyHidden>lliist — dynamic, reusable checklists</C.VisuallyHidden>
          <C.Icon aria-hidden as={Logo} h="auto" w="6rem" />
        </C.Heading>
        <Link href="/" passHref>
          <C.Button as={C.Link} size="sm" variant="cta">
            sign in
          </C.Button>
        </Link>
      </C.HStack>
      <C.VStack mt={24} spacing={12}>
        <C.Heading as="p">conquer the chaos with dynamic, reusable checklists</C.Heading>
        <Link href="/" passHref>
          <C.Button
            as={C.Link}
            iconSpacing={6}
            rightIcon={<C.Icon as={ChevronRight} boxSize={6} />}
            variant="cta"
            w="full"
          >
            launch the app
          </C.Button>
        </Link>
        <C.List color="fgSecondary" spacing={2} textAlign="left">
          {['no ads/tracking', 'open source', '100% free'].map((item) => (
            <C.ListItem alignItems="center" display="flex" key={item}>
              <C.ListIcon as={Check} boxSize={6} color="fgPrimary" me={6} />
              {item}
            </C.ListItem>
          ))}
        </C.List>
      </C.VStack>
    </C.Box>
    <C.Center py={12}>
      <C.Divider h="100px" orientation="vertical" />
    </C.Center>
    <C.VStack as="main" spacing={24}>
      {[
        ['streamlined design', 'outdated, clunky checklist apps never stood a chance'],
        ['categories & tags', 'create unique checklists from a base set of list items'],
        ['cross-device sync', 'manage and utilize your checklists from any device with ease', true],
        ['collaborate & share', 'collaborate on and share checklists with friends and family', true],
      ].map(([heading, description, soon]) => (
        <C.Box as="section" key={heading as string}>
          <C.Heading as="h3">{heading}</C.Heading>
          <C.Text mt={3}>{description}</C.Text>
          {soon && (
            <C.Badge colorScheme="green" mt={4}>
              coming soon
            </C.Badge>
          )}
        </C.Box>
      ))}
    </C.VStack>
    <C.Center py={12}>
      <C.Divider h="100px" orientation="vertical" />
    </C.Center>
    <C.Box as="footer">
      <Link href="/" passHref>
        <C.Button
          as={C.Link}
          iconSpacing={6}
          rightIcon={<C.Icon as={ChevronRight} boxSize={6} />}
          variant="cta"
          w="full"
        >
          give it a whirl
        </C.Button>
      </Link>
      <C.List mt={24} spacing={6}>
        <C.ListItem>
          <Link href="#" passHref>
            <C.Link>privacy policy</C.Link>
          </Link>
        </C.ListItem>
        <C.ListItem>
          <Link href="#" passHref>
            <C.Link>terms &amp; conditions</C.Link>
          </Link>
        </C.ListItem>
        <C.ListItem>
          <C.Link href="https://github.com/xvvvyz/lliist">source code</C.Link>
        </C.ListItem>
      </C.List>
    </C.Box>
  </C.Container>
);

export default WhatPage;
