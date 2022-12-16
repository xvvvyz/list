import { NextSeo } from 'next-seo';
import useActiveProfile from '../../../../hooks/use-active-profile';

const Seo = () => {
  const activeProfile = useActiveProfile();
  return <NextSeo nofollow noindex title={activeProfile ? `${activeProfile.text} items` : undefined} />;
};

export default Seo;
