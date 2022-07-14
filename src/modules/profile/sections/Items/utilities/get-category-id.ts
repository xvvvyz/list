import { Category, CategoryMap } from '../../../../../models/category';

const getCategoryId = (categoryMap: CategoryMap, id: string) =>
  Object.values(categoryMap).find((category: Category) => category.id === id || category.itemIds.includes(id))?.id ??
  '';

export default getCategoryId;
