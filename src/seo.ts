const description =
  'The free and open source reusable checklist web app that nobody asked for. Dynamically create and share checklists by categorizing and tagging list items.';

const url = 'https://lliist.app';

const seo = {
  additionalMetaTags: [],
  canonical: url,
  defaultTitle: 'lliist — dynamic, reusable checklists',
  description: description,
  openGraph: {
    description,
    locale: 'en_US',
    site_name: 'lliist',
    title: 'lliist',
    type: 'website',
    url,
  },
  titleTemplate: '%s - lliist',
  twitter: {
    handle: '@xvvvyz',
  },
};

export default seo;
