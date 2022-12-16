import { NextSeo } from 'next-seo';
import useActiveChecklist from '../../../../hooks/use-active-checklist';

const Seo = () => {
  const activeChecklist = useActiveChecklist();
  return <NextSeo nofollow noindex title={activeChecklist ? `${activeChecklist.text}` : undefined} />;
};

export default Seo;
