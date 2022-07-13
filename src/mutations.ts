import { accountMutations } from './models/account';
import { categoryMutations } from './models/category';
import { checklistMutations } from './models/checklist';
import { itemMutations } from './models/item';
import { profileMutations } from './models/profile';

type Mutations = typeof mutations;

const mutations = {
  ...accountMutations,
  ...categoryMutations,
  ...checklistMutations,
  ...itemMutations,
  ...profileMutations,
};

export default mutations;
export type { Mutations };
