import app from '../layouts/app';
import Seo from '../modules/profile/components/Seo';
import Checklists from '../modules/profile/sections/Checklists';
import Header from '../modules/profile/sections/Header';
import Items from '../modules/profile/sections/Items';
import Tips from '../modules/profile/sections/Tips';

const IndexPage = () => (
  <>
    <Seo />
    <Header />
    <Checklists />
    <Items />
    <Tips />
  </>
);

export default app(IndexPage);
