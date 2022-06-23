import * as T from '../types';

const parseCategory = (id: T.Id, data: T.Account) => ({
  id,
  items: data.categories[id].items.map((itemId) => data.items[itemId]),
  text: data.categories[id].text,
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
            !new RegExp(' {2}.+').test(item.text) ||
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
    text: data.checklists[id].text,
  };
};

const parseProfile = (id: T.Id, data: T.Account) => ({
  categories: data.profiles[id].categories.map((categoryId) => parseCategory(categoryId, data)),
  checklists: data.profiles[id].checklists.map((checklistId) => parseChecklist(checklistId, data)),
  id,
  text: data.profiles[id].text,
});

const parseProfiles = (data: T.Account): T.ProfileParsed[] =>
  data.user.profiles.map((profileId) => parseProfile(profileId, data));

export default parseProfiles;
