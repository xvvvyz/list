import parseCategory from './parse-category';

const parseChecklist = (id, data) => {
  let itemsCount = 0;
  let itemsCompletedCount = 0;

  const checklist = data.checklistsMap[id].categories.map((categoryId) => {
    const category = parseCategory(categoryId, data);

    return {
      ...category,
      items: category.items
        .filter((item) => {
          const include =
            !new RegExp(' {2}.+').test(item.text) ||
            data.checklistsMap[id].tags.some((tag) =>
              new RegExp(`${tag}($| {2})`).test(item.text)
            );

          if (include) itemsCount++;
          return include;
        })
        .map((item) => {
          const completed = data.checklistsMap[id].completed.includes(item.id);
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
    text: data.checklistsMap[id].text,
  };
};

export default parseChecklist;
