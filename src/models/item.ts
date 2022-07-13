import { ReadTransaction, WriteTransaction } from 'replicache';
import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';
import { categoryMutations, categoryQueries } from './category';

const itemSchema = entitySchema.extend({
  id: z.string(),
  text: z.string(),
});

type Item = z.infer<typeof itemSchema>;
type ItemMap = Record<string, Item>;
type ChecklistItem = Item & { completed: boolean };

const { delete: deleteItem, get, put, update } = generate('item', itemSchema);

const itemMutations = {
  createItem: async (
    tx: WriteTransaction,
    { atIndex, categoryId, id, text }: { atIndex: number; categoryId: string; id: string; text?: Item['text'] }
  ) => {
    const category = await categoryQueries.category(tx, categoryId);
    if (!category) return;
    await put(tx, { id, text: text ?? '' });

    await categoryMutations.updateCategory(tx, {
      id: category.id,
      itemIds: [...category.itemIds.slice(0, atIndex), id, ...category.itemIds.slice(atIndex)],
    });
  },
  deleteItem: async (tx: WriteTransaction, { categoryId, id }: { categoryId: string; id: string }) => {
    const category = await categoryQueries.category(tx, categoryId);
    if (!category) return;
    await deleteItem(tx, id);

    await categoryMutations.updateCategory(tx, {
      id: category.id,
      itemIds: category.itemIds.filter((itemId) => itemId !== id),
    });
  },
  updateItem: update,
};

const itemQueries = {
  allItemMap: async (tx: ReadTransaction, { accountId }: { accountId: string }): Promise<ItemMap> => {
    const categories = await categoryQueries.allCategoryDenormalized(tx, { accountId });

    return categories.reduce(
      (itemMap, category) => ({
        ...itemMap,
        ...category.items.reduce((itemSubmap, item) => ({ ...itemSubmap, [item.id]: item }), {}),
      }),
      {}
    ) as ItemMap;
  },
  item: get,
};

export { itemMutations, itemQueries };
export type { Item, ItemMap, ChecklistItem };
