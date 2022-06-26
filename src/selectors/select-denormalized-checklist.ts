import selectDenormalizedCategory from './select-denormalized-category';
import { Id } from '../types';
import { State } from '../reducer';

const selectDenormalizedChecklist = (state: Pick<State, 'categories' | 'checklists' | 'items'>, { id }: { id: Id }) => {
  let itemsCount = 0;
  let itemsCompletedCount = 0;

  const checklist = state.checklists[id].categories.map((categoryId) => {
    const category = selectDenormalizedCategory(
      { categories: state.categories, items: state.items },
      { id: categoryId }
    );

    return {
      ...category,
      items: category.items
        .filter((item) => {
          const include =
            !/ {2}.+/.test(item.text) ||
            state.checklists[id].tags.some((tag) => new RegExp(`${tag}($| {2})`).test(item.text));

          if (include) itemsCount++;
          return include;
        })
        .map((item) => {
          const completed = state.checklists[id].completed.includes(String(item.id));
          if (completed) itemsCompletedCount++;
          return { ...item, completed };
        }),
    };
  });

  return {
    checklist,
    id,
    itemsCompletedCount,
    itemsCount,
    text: state.checklists[id].text,
  };
};

export default selectDenormalizedChecklist;
