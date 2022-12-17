const name = 'llist';
const title = 'llist — dynamic checklists';
const url = 'https://llist.app';

const description =
  'The free and open source dynamic checklist web app that nobody asked for. Categorize and tag list items to generate checklists on the fly.';

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
  defaultTitle: title,
  description: description,
  openGraph: {
    description,
    images: [{ alt: 'conquer the chaos with dynamic checklists', height: 630, url: `${url}/og.png`, width: 1200 }],
    locale: 'en_US',
    site_name: name,
    title: title,
    type: 'website',
    url,
  },
  titleTemplate: `%s - ${name}`,
  twitter: { cardType: 'summary_large_image', handle: '@xvvvyz' },
};

export default seo;
