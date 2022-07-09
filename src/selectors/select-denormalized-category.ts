import { Id, State } from '../types';

const selectDenormalizedCategory = (state: Pick<State, 'categories' | 'items'>, { id }: { id: Id }) => ({
  ...state.categories[id],
  items: state.categories[id].items.map((itemId) => state.items[itemId]),
});

export default selectDenormalizedCategory;
