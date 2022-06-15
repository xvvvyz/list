const parseCategory = (id, data) => ({
  id,
  items: data.categories[id].items.map((itemId) => data.items[itemId]),
  text: data.categories[id].text,
});

export default parseCategory;
