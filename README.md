# lliist

A WIP dynamic, reusable checklist PWA for personal use and learning.

## Development Setup

Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node](https://nodejs.org/en/download),
then:

```shell
git clone git@github.com:xvvvyz/lliist.git
cd lliist
npm i
npx replicache get-license
echo 'NEXT_PUBLIC_REPLICACHE_LICENSE_KEY=<your license key>' > .env
npm start
```

## Production Setup

```javascript
// TODO: add production setup instructions
```

## Built With

- [Figma](https://www.figma.com) to explore UI concepts
- [TypeScript](https://www.typescriptlang.org) for strictly-typed JavaScript
- [Next.js](https://nextjs.org) + [Vercel](https://vercel.com) for production-ready [React](https://reactjs.org)
- [Replicache](https://replicache.dev) + [Supabase](https://supabase.com) for state management
- [Chakra UI](https://chakra-ui.com) for accessible UI components
- [dnd kit](https://dndkit.com) for accessible drag and drop
- [Prettier](https://prettier.io) for automatic code formatting
- [ESLint](https://eslint.org) to enforce code best practices
- [Jest](https://jestjs.io) to enable seamless unit tests
- [RTL](https://testing-library.com/docs/react-testing-library/intro/) to test React components
- [Cypress](https://www.cypress.io) to test end-to-end
