import keyBy from 'lodash/keyBy';
import { ReadonlyJSONValue, ReadTransaction, WriteTransaction } from 'replicache';
import { arrayMove } from '@dnd-kit/sortable';
import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';
import { ChecklistItem, Item, itemQueries } from './item';
import { profileMutations, profileQueries } from './profile';

const categorySchema = entitySchema.extend({
  id: z.string(),
  itemIds: z.string().array(),
  text: z.string(),
});

type Category = z.infer<typeof categorySchema>;

type CategoryDenormalized = ReadonlyJSONValue &
  Omit<Category, 'itemIds'> & {
    items: (Item | ChecklistItem)[];
  };

type CategoryMap = Record<string, Category>;

const { delete: deleteCategory, get, put, update } = generate('category', categorySchema);

const categoryMutations = {
  createCategory: async (
    tx: WriteTransaction,
    { accountId, atIndex, id, text }: { accountId: string; atIndex: number; id: string; text?: Category['text'] }
  ) => {
    const activeProfile = await profileQueries.activeProfile(tx, { accountId });
    if (!activeProfile) return;
    await put(tx, { id, itemIds: [], text: text ?? '' });

    await profileMutations.updateProfile(tx, {
      categoryIds: [...activeProfile.categoryIds.slice(0, atIndex), id, ...activeProfile.categoryIds.slice(atIndex)],
      id: activeProfile.id,
    });
  },
  deleteCategory: async (tx: WriteTransaction, { accountId, id }: { accountId: string; id: string }) => {
    const activeProfile = await profileQueries.activeProfile(tx, { accountId });
    if (!activeProfile) return;
    await deleteCategory(tx, id);

    await profileMutations.updateProfile(tx, {
      categoryIds: activeProfile.categoryIds.filter((categoryId) => categoryId !== id),
      id: activeProfile.id,
    });
  },
  moveItem: async (
    tx: WriteTransaction,
    {
      fromCategoryId,
      id,
      toCategoryId,
      toIndex,
    }: { fromCategoryId: string; id: string; toCategoryId: string; toIndex: number }
  ) => {
    const fromCategory = await get(tx, fromCategoryId);
    const toCategory = await get(tx, toCategoryId);
    if (!fromCategory || !toCategory) return;

    await update(tx, {
      id: fromCategory.id,
      itemIds: fromCategory.itemIds.filter((itemId) => itemId !== id),
    });

    await update(tx, {
      id: toCategory.id,
      itemIds: [...toCategory.itemIds.slice(0, toIndex), id, ...toCategory.itemIds.slice(toIndex)],
    });
  },
  reorderItem: async (
    tx: WriteTransaction,
    { categoryId, fromIndex, toIndex }: { categoryId: string; fromIndex: number; toIndex: number }
  ) => {
    const category = await get(tx, categoryId);
    if (!category) return;

    await update(tx, {
      id: category.id,
      itemIds: arrayMove(category.itemIds, fromIndex, toIndex),
    });
  },
  updateCategory: update,
};

const categoryQueries = {
  allCategory: async (tx: ReadTransaction, { accountId }: { accountId: string }): Promise<Category[]> => {
    const activeProfile = await profileQueries.activeProfile(tx, { accountId });
    if (!activeProfile) return [];
    const categories = await Promise.all(activeProfile.categoryIds.map((categoryId) => get(tx, categoryId)));
    return categories.filter((category) => category) as Category[];
  },
  allCategoryDenormalized: async (
    tx: ReadTransaction,
    { accountId }: { accountId: string }
  ): Promise<CategoryDenormalized[]> => {
    const activeProfile = await profileQueries.activeProfile(tx, { accountId });
    if (!activeProfile) return [];

    const categories = await Promise.all(
      activeProfile.categoryIds.map((categoryId) => categoryQueries.categoryDenormalized(tx, categoryId))
    );

    return categories.filter((category) => category) as CategoryDenormalized[];
  },
  allCategoryMap: async (tx: ReadTransaction, { accountId }: { accountId: string }): Promise<CategoryMap> => {
    const categories = await categoryQueries.allCategory(tx, { accountId });
    return keyBy(categories, 'id') as CategoryMap;
  },
  category: get,
  categoryDenormalized: async (tx: ReadTransaction, id: string): Promise<CategoryDenormalized | undefined> => {
    const category = await get(tx, id);
    if (!category) return;
    const items = await Promise.all(category.itemIds.map((itemId) => itemQueries.item(tx, itemId)));

    return {
      id: category.id,
      items: items.filter((item) => item) as Item[],
      text: category.text,
    };
  },
};

export { categoryMutations, categoryQueries };
export type { Category, CategoryDenormalized, CategoryMap };
