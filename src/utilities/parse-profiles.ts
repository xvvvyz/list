import * as T from '../types';

const parseCategory = (id: T.Id, data: T.Account) => ({
  ...data.categories[id],
  items: data.categories[id].items.map((itemId) => data.items[itemId]),
});

const parseChecklist = (id: T.Id, data: T.Account) => {
  let itemsCount = 0;
  let itemsCompletedCount = 0;

  const checklist = data.checklists[id].categories.map((categoryId) => {
    const category = parseCategory(categoryId, data);

    return {
      ...category,
      items: category.items
        .filter((item) => {
          const include =
            !/ {2}.+/.test(item.text) ||
            data.checklists[id].tags.some((tag) => new RegExp(`${tag}($| {2})`).test(item.text));

          if (include) itemsCount++;
          return include;
        })
        .map((item) => {
          const completed = data.checklists[id].completed.includes(String(item.id));
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
    meta: data.checklists[id].meta,
    text: data.checklists[id].text,
  };
};

const parseProfiles = (data: T.Account): T.ProfileParsed[] =>
  data.user.profiles.map((id) => ({
    ...data.profiles[id],
    categories: data.profiles[id].categories.map((categoryId) => parseCategory(categoryId, data)),
    checklists: data.profiles[id].checklists.map((checklistId) => parseChecklist(checklistId, data)),
  }));

export default parseProfiles;
