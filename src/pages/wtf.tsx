import * as C from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Check from '../images/check.svg';
import ChevronRight from '../images/chevron-right.svg';
import Logo from '../images/logo.svg';

const WtfPage = () => (
  <C.Container maxW={{ base: 'container.xs', sm: 'container.md' }} pb={24} textAlign="center">
    <C.Box as="header">
      <C.HStack justify="space-between" pt={8}>
        <C.Heading as="h1">
          <C.VisuallyHidden>lliist — dynamic, reusable checklists</C.VisuallyHidden>
          <C.Icon aria-hidden as={Logo} h={9} w="auto" />
        </C.Heading>
        <Link href="/" passHref>
          <C.Button as={C.Link} size="sm" tabIndex={-1} variant="primary">
            sign in
          </C.Button>
        </Link>
      </C.HStack>
      <C.Heading as="p" mt={24} size="xl">
        <C.Box
          as="span"
          bgClip="text"
          bgGradient="linear(to-r, green.400, blue.400, purple.400, pink.400, red.400, orange.400, yellow.400)"
        >
          conquer the chaos with
        </C.Box>{' '}
        dynamic, reusable checklists
      </C.Heading>
      <Link href="/" passHref>
        <C.Button
          as={C.Link}
          iconSpacing={6}
          mt={24}
          rightIcon={<C.Icon as={ChevronRight} boxSize={6} />}
          variant="primary"
          w="full"
        >
          give it a whirl
        </C.Button>
      </Link>
      <C.Center>
        <C.Divider display={{ base: 'none', sm: 'block' }} h={24} orientation="vertical" />
      </C.Center>
      <C.Center bg="inherit" layerStyle="borderCard" py={24}>
        <C.List color="fgSecondary" spacing={2} textAlign="left">
          {['no sign up required', 'no analytics or ads', 'free & open source'].map((item) => (
            <C.ListItem alignItems="center" display="flex" key={item}>
              <C.ListIcon as={Check} boxSize={6} color="fgPrimary" me={6} />
              {item}
            </C.ListItem>
          ))}
        </C.List>
      </C.Center>
    </C.Box>
    <C.Center>
      <C.Divider h={24} orientation="vertical" />
    </C.Center>
    <C.Box as="main" bg="inherit" layerStyle="borderCard">
      {[
        ['streamlined design', 'outdated, clunky checklist apps never stood a chance'],
        ['categories & tags', 'create unique checklists from a base set of list items'],
        ['cross-device sync', 'manage and utilize your checklists from any device with ease'],
      ].map(([heading, description]) => (
        <C.Box
          _first={{ borderStyle: 'none' }}
          as="section"
          borderColor="borderPrimary"
          borderStyle="solid none none"
          borderWidth="1px"
          key={heading as string}
          px={{ sm: 10 }}
          py={24}
        >
          <C.Heading as="h2">{heading}</C.Heading>
          <C.Text mt={3}>{description}</C.Text>
        </C.Box>
      ))}
    </C.Box>
    <C.Center>
      <C.Divider h={24} orientation="vertical" />
    </C.Center>
    <C.Box as="footer" mt={{ base: 24, sm: 0 }}>
      <Link href="/" passHref>
        <C.Button
          as={C.Link}
          iconSpacing={6}
          rightIcon={<C.Icon as={ChevronRight} boxSize={6} />}
          variant="primary"
          w="full"
        >
          create a lliist
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

export default WtfPage;
