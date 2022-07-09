import selectActiveProfile from './select-active-profile';
import { Id, State } from '../types';

const selectCategoryId = (
  state: Pick<State, 'account' | 'categories' | 'items' | 'profiles'>,
  { id }: { id: Id }
): Id => {
  const activeProfile = selectActiveProfile(state);

  const categoryId = activeProfile.categories.find(
    (categoryId) => categoryId === id || state.categories[categoryId].items.some((itemId) => itemId === id)
  );

  return categoryId || '';
};

export default selectCategoryId;
