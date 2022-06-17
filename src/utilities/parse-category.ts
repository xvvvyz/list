const parseCategory = (id, data) => ({
  id,
  items: data.categoriesMap[id].items.map((itemId) => data.itemsMap[itemId]),
  text: data.categoriesMap[id].text,
});

export default parseCategory;
