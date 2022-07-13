import { Category, CategoryMap } from '../../../../../models/category';

const getCategoryId = (categoriesMap: CategoryMap, id: string) =>
  Object.values(categoriesMap).find((category: Category) => category.id === id || category.itemIds.includes(id))?.id ??
  '';

export default getCategoryId;
