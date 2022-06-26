const description =
  'Easily create checklists that vary depending on the circumstance. Travel/packing lists, recipes and other SOPs are all great use-cases for lliist.';

const url = 'https://lliist.app';

const seo = {
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
