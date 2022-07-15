import keyBy from 'lodash/keyBy';
import { ReadonlyJSONValue, ReadTransaction } from 'replicache';
import account from './models/account';
import category, { CategoryDenormalized, CategoryMap } from './models/category';
import checklist, { Checklist, ChecklistDenormalized, ChecklistItem } from './models/checklist';
import item, { Item, ItemMap } from './models/item';
import profile, { Profile } from './models/profile';

type CategoryAndItemMap = ReadonlyJSONValue & {
  categoryMap: CategoryMap;
  itemMap: ItemMap;
};

const queries = {
  account: account.get,
  activeProfile: async (tx: ReadTransaction, { accountId }: { accountId: string }): Promise<Profile | undefined> => {
    const acc = await account.get(tx, accountId);
    if (!acc) return;
    const activeProfileId = acc.profileIds[0];
    if (!activeProfileId) return;
    return await profile.get(tx, activeProfileId);
  },
  allCategoryAndItemMap: async (
    tx: ReadTransaction,
    { accountId }: { accountId: string }
  ): Promise<CategoryAndItemMap> => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    const maps: CategoryAndItemMap = { categoryMap: {}, itemMap: {} };
    if (!activeProfile) return maps;

    await Promise.all(
      activeProfile.categoryIds.map(async (categoryId) => {
        const cat = await category.get(tx, categoryId);
        if (!cat) return;
        maps.categoryMap[cat.id] = cat;

        await Promise.all(
          cat.itemIds.map(async (itemId) => {
            const ite = await item.get(tx, itemId);
            if (!ite) return;
            maps.itemMap[ite.id] = ite;
          })
        );
      })
    );

    return maps;
  },
  allChecklistDenormalized: async (
    tx: ReadTransaction,
    { accountId }: { accountId: string }
  ): Promise<ChecklistDenormalized[]> => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    if (!activeProfile) return [];

    const checklists = await Promise.all(
      activeProfile.checklistIds.map((checklistId) => queries.checklistDenormalized(tx, checklistId))
    );

    return checklists.filter((checklist) => checklist) as ChecklistDenormalized[];
  },
  allProfile: async (tx: ReadTransaction, { accountId }: { accountId: string }): Promise<Profile[]> => {
    const acc = await account.get(tx, accountId);
    if (!acc) return [];
    const profiles = keyBy(await profile.list(tx), 'id');
    return acc.profileIds.map((profileId) => profiles[profileId]).filter((profile) => profile);
  },
  category: category.get,
  categoryDenormalized: async (tx: ReadTransaction, id: string): Promise<CategoryDenormalized | undefined> => {
    const cat = await category.get(tx, id);
    if (!cat) return;
    const items = await Promise.all(cat.itemIds.map((itemId) => item.get(tx, itemId)));

    return {
      id: cat.id,
      items: items.filter((item) => item) as Item[],
      text: cat.text,
    };
  },
  checklistDenormalized: async (tx: ReadTransaction, id: string): Promise<ChecklistDenormalized | undefined> => {
    const che = await checklist.get(tx, id);
    if (!che) return;
    let itemsCount = 0;
    let itemsCompletedCount = 0;

    const categories = await Promise.all(
      che.includeCategoryIds.map(async (categoryId) => {
        const category = await queries.categoryDenormalized(tx, categoryId);
        if (!category) return;

        return {
          items: category.items
            .filter((item) => {
              const include =
                !/ {2}.+/.test(item.text) ||
                che.includeTagIds.some((tag) => new RegExp(`${tag}($| {2})`).test(item.text));

              if (include) {
                itemsCount++;
                return true;
              }
            })
            .map((item) => {
              const completed = che.completedItemIds.includes(String(item.id));
              if (completed) itemsCompletedCount++;
              return { ...Object(item), completed } as ChecklistItem;
            }),
          text: category.text,
        };
      })
    );

    return {
      categories: categories.filter((category) => category) as CategoryDenormalized[],
      id,
      itemsCompletedCount,
      itemsCount,
      text: che.text,
    };
  },
  item: item.get,
  profile: profile.get,
};

export default queries;
