const name = 'lliist';
const url = 'https://lliist.app';

const description =
  'The free and open source reusable checklist web app that nobody asked for. Dynamically create and share checklists by categorizing and tagging list items.';

const seo = {
  additionalLinkTags: [
    { href: '/apple-icon-180.png', rel: 'apple-touch-icon' },
    { href: '/favicon-196.png', rel: 'icon', sizes: '196x196', type: 'image/png' },
    { href: '/manifest.json', rel: 'manifest' },
  ],
  additionalMetaTags: [
    { content: '#0c0c0c', name: 'theme-color' },
    { content: 'yes', name: 'apple-mobile-web-app-capable' },
    { content: name, name: 'apple-mobile-web-app-title' },
    { content: name, name: 'application-name' },
  ],
  canonical: url,
  defaultTitle: 'lliist — dynamic, reusable checklists',
  description: description,
  openGraph: {
    description,
    images: [{ alt: 'lliist logo', height: 460, url: `${url}/apple-splash-dark-1136-640.png`, width: 1136 }],
    locale: 'en_US',
    site_name: name,
    title: name,
    type: 'website',
    url,
  },
  titleTemplate: `%s - ${name}`,
  twitter: { handle: '@xvvvyz' },
};

export default seo;
