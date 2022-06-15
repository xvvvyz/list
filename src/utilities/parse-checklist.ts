import parseCategory from './parse-category';

const parseChecklist = (id, data) => {
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
            data.checklists[id].tags.some((tag) =>
              new RegExp(`${tag}($| {2})`).test(item.text)
            );

          if (include) itemsCount++;
          return include;
        })
        .map((item) => {
          const completed = data.checklists[id].completed.includes(item.id);
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

export default parseChecklist;
