import { arrayMove } from '@dnd-kit/sortable';
import { Update } from '@rocicorp/rails';
import { WriteTransaction } from 'replicache';
import account from './models/account';
import category, { Category } from './models/category';
import checklist from './models/checklist';
import item, { Item } from './models/item';
import profile from './models/profile';
import queries from './queries';
import trimWhitespace from './utilities/trim-whitespace';

type Mutations = typeof mutations;

const mutations = {
  addChecklistCategoryId: async (
    tx: WriteTransaction,
    { categoryId, checklistId }: { categoryId: string; checklistId: string }
  ) => {
    const activeChecklist = await queries.checklist(tx, checklistId);
    if (!activeChecklist) return;

    await checklist.update(tx, {
      id: activeChecklist.id,
      includeCategoryIds: [...activeChecklist.includeCategoryIds, categoryId],
    });
  },
  addChecklistTag: async (tx: WriteTransaction, { checklistId, tag }: { checklistId: string; tag: string }) => {
    const activeChecklist = await queries.checklist(tx, checklistId);
    if (!activeChecklist) return;

    await checklist.update(tx, {
      id: activeChecklist.id,
      includeTags: [...activeChecklist.includeTags, tag],
    });
  },
  checkItem: async (tx: WriteTransaction, { checklistId, itemId }: { checklistId: string; itemId: string }) => {
    const activeChecklist = await queries.checklist(tx, checklistId);
    if (!activeChecklist) return;

    await checklist.update(tx, {
      completedItemIds: [...activeChecklist.completedItemIds, itemId],
      id: activeChecklist.id,
    });
  },
  createCategory: async (
    tx: WriteTransaction,
    { accountId, atIndex, id, text }: { accountId: string; atIndex: number; id: string; text?: Category['text'] }
  ) => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    if (!activeProfile) return;
    await category.put(tx, { id, itemIds: [], text: text ?? '' });

    await profile.update(tx, {
      categoryIds: [...activeProfile.categoryIds.slice(0, atIndex), id, ...activeProfile.categoryIds.slice(atIndex)],
      id: activeProfile.id,
    });
  },
  createChecklist: async (
    tx: WriteTransaction,
    { accountId, atBeginning, id }: { accountId: string; atBeginning?: boolean; id: string }
  ) => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    if (!activeProfile) return;

    await checklist.put(tx, {
      completedItemIds: [],
      id,
      includeCategoryIds: [],
      includeTags: [],
      text: '',
    });

    await profile.update(tx, {
      checklistIds: atBeginning ? [id, ...activeProfile.checklistIds] : [...activeProfile.checklistIds, id],
      id: activeProfile.id,
    });
  },
  createItem: async (
    tx: WriteTransaction,
    { atIndex, categoryId, id, text }: { atIndex: number; categoryId: string; id: string; text?: Item['text'] }
  ) => {
    const cat = await category.get(tx, categoryId);
    if (!cat) return;
    await item.put(tx, { id, text: text ?? '' });

    await category.update(tx, {
      id: cat.id,
      itemIds: [...cat.itemIds.slice(0, atIndex), id, ...cat.itemIds.slice(atIndex)],
    });
  },
  createProfile: async (
    tx: WriteTransaction,
    { accountId, atBeginning, id }: { accountId: string; atBeginning: boolean; id: string }
  ) => {
    let acc = await account.get(tx, accountId);

    if (!acc) {
      acc = { id: accountId, profileIds: [] };
      await account.put(tx, acc);
    }

    await profile.put(tx, {
      categoryIds: [],
      checklistIds: [],
      id,
      text: '',
    });

    await account.update(tx, {
      id: acc.id,
      profileIds: atBeginning ? [id, ...acc.profileIds] : [...acc.profileIds, id],
    });
  },
  deleteCategory: async (tx: WriteTransaction, { accountId, id }: { accountId: string; id: string }) => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    if (!activeProfile) return;

    await profile.update(tx, {
      categoryIds: activeProfile.categoryIds.filter((categoryId) => categoryId !== id),
      id: activeProfile.id,
    });

    await category.delete(tx, id);
  },
  deleteChecklist: async (tx: WriteTransaction, { accountId, id }: { accountId: string; id: string }) => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    if (!activeProfile) return;

    await profile.update(tx, {
      checklistIds: activeProfile.checklistIds.filter((checklistId) => checklistId !== id),
      id: activeProfile.id,
    });

    await checklist.delete(tx, id);
  },
  deleteItem: async (tx: WriteTransaction, { categoryId, id }: { categoryId: string; id: string }) => {
    const cat = await category.get(tx, categoryId);
    if (!cat) return;

    await category.update(tx, {
      id: cat.id,
      itemIds: cat.itemIds.filter((itemId) => itemId !== id),
    });

    await item.delete(tx, id);
  },
  deleteProfile: async (tx: WriteTransaction, { accountId, id }: { accountId: string; id: string }) => {
    const acc = await account.get(tx, accountId);
    if (!acc) return;

    await account.update(tx, {
      id: acc.id,
      profileIds: acc.profileIds.filter((profileId) => profileId !== id),
    });

    await profile.delete(tx, id);
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
    const fromCategory = await category.get(tx, fromCategoryId);
    const toCategory = await category.get(tx, toCategoryId);
    if (!fromCategory || !toCategory) return;

    await category.update(tx, {
      id: fromCategory.id,
      itemIds: fromCategory.itemIds.filter((itemId) => itemId !== id),
    });

    await category.update(tx, {
      id: toCategory.id,
      itemIds: [...toCategory.itemIds.slice(0, toIndex), id, ...toCategory.itemIds.slice(toIndex)],
    });
  },
  removeChecklistCategoryId: async (
    tx: WriteTransaction,
    { categoryId, checklistId }: { categoryId: string; checklistId: string }
  ) => {
    const activeChecklist = await queries.checklist(tx, checklistId);
    if (!activeChecklist) return;

    await checklist.update(tx, {
      id: activeChecklist.id,
      includeCategoryIds: activeChecklist.includeCategoryIds.filter((id) => id !== categoryId),
    });
  },
  removeChecklistTag: async (tx: WriteTransaction, { checklistId, tag }: { checklistId: string; tag: string }) => {
    const activeChecklist = await queries.checklist(tx, checklistId);
    if (!activeChecklist) return;

    await checklist.update(tx, {
      id: activeChecklist.id,
      includeTags: activeChecklist.includeTags.filter((t) => t !== tag),
    });
  },
  reorderCategory: async (
    tx: WriteTransaction,
    { accountId, id, toIndex }: { accountId: string; id: string; toIndex: number }
  ) => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    if (!activeProfile) return;
    const fromIndex = activeProfile.categoryIds.indexOf(id);

    await profile.update(tx, {
      categoryIds: arrayMove(activeProfile.categoryIds, fromIndex, toIndex),
      id: activeProfile.id,
    });
  },
  reorderChecklist: async (
    tx: WriteTransaction,
    { accountId, id, toIndex }: { accountId: string; id: string; toIndex: number }
  ) => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    if (!activeProfile) return;
    const fromIndex = activeProfile.checklistIds.indexOf(id);

    await profile.update(tx, {
      checklistIds: arrayMove(activeProfile.checklistIds, fromIndex, toIndex),
      id: activeProfile.id,
    });
  },
  reorderItem: async (
    tx: WriteTransaction,
    { categoryId, id, toIndex }: { categoryId: string; id: string; toIndex: number }
  ) => {
    const cat = await category.get(tx, categoryId);
    if (!cat) return;
    const fromIndex = cat.itemIds.indexOf(id);

    await category.update(tx, {
      id: cat.id,
      itemIds: arrayMove(cat.itemIds, fromIndex, toIndex),
    });
  },
  reorderProfile: async (
    tx: WriteTransaction,
    { accountId, id, toIndex }: { accountId: string; id: string; toIndex: number }
  ) => {
    const acc = await account.get(tx, accountId);
    if (!acc) return;
    const fromIndex = acc.profileIds.indexOf(id);

    await account.update(tx, {
      id: accountId,
      profileIds: arrayMove(acc.profileIds, fromIndex, toIndex),
    });
  },
  uncheckItem: async (tx: WriteTransaction, { checklistId, itemId }: { checklistId: string; itemId: string }) => {
    const activeChecklist = await queries.checklist(tx, checklistId);
    if (!activeChecklist) return;

    await checklist.update(tx, {
      completedItemIds: activeChecklist.completedItemIds.filter((id) => id !== itemId),
      id: activeChecklist.id,
    });
  },
  updateAccount: account.update,
  updateCategory: async (tx: WriteTransaction, data: Update<Item>) => {
    const newData = { ...data };
    if (newData.text) newData.text = trimWhitespace(newData.text);
    return category.update(tx, newData);
  },
  updateChecklist: checklist.update,
  updateItem: async (tx: WriteTransaction, data: Update<Item>) => {
    const newData = { ...data };
    if (newData.text) newData.text = trimWhitespace(newData.text);
    return item.update(tx, newData);
  },
  updateProfile: profile.update,
};

export default mutations;
export type { Mutations };
