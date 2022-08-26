import keyBy from 'lodash/keyBy';
import { ReadonlyJSONValue, ReadTransaction } from 'replicache';
import account from './models/account';
import category, { CategoryDenormalized, CategoryMap, ChecklistCategoryDenormalized } from './models/category';
import checklist, * as checklistTypes from './models/checklist';
import item, { Item, ItemMap } from './models/item';
import profile, { Profile, ProfileWithIdAndText } from './models/profile';

type CategoryItemTagMap = ReadonlyJSONValue & {
  categoryMap: CategoryMap;
  itemMap: ItemMap;
  tagList: string[];
};

const queries = {
  activeProfile: async (tx: ReadTransaction, { accountId }: { accountId: string }): Promise<Profile | undefined> => {
    const acc = await account.get(tx, accountId);
    if (!acc) return;
    const activeProfileId = acc.profileIds[0];
    if (!activeProfileId) return;
    return profile.get(tx, activeProfileId);
  },
  allCategoryItemTagMap: async (
    tx: ReadTransaction,
    { accountId }: { accountId: string }
  ): Promise<CategoryItemTagMap> => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    const res: CategoryItemTagMap = { categoryMap: {}, itemMap: {}, tagList: [] };
    if (!activeProfile) return res;
    const tagSet = new Set<string>();

    await Promise.all(
      activeProfile.categoryIds.map(async (categoryId) => {
        const cat = await category.get(tx, categoryId);
        if (!cat) return;
        res.categoryMap[cat.id] = cat;

        await Promise.all(
          cat.itemIds.map(async (itemId) => {
            const ite = await item.get(tx, itemId);
            if (!ite) return;
            res.itemMap[ite.id] = ite;

            ite.text
              .split('  ')
              .slice(1)
              .forEach((tag) => tagSet.add(tag));
          })
        );
      })
    );

    res.tagList = Array.from(tagSet);
    return res;
  },
  allChecklist: async (
    tx: ReadTransaction,
    { accountId }: { accountId: string }
  ): Promise<checklistTypes.ChecklistDenormalizedWithoutCategories[]> => {
    const activeProfile = await queries.activeProfile(tx, { accountId });
    if (!activeProfile) return [];

    const checklists = await Promise.all(
      activeProfile.checklistIds.map((checklistId) => queries.checklist(tx, checklistId))
    );

    return checklists.reduce((acc: checklistTypes.ChecklistDenormalizedWithoutCategories[], checklist) => {
      if (!checklist) return acc;
      return [...acc, checklist];
    }, []);
  },
  allProfile: async (tx: ReadTransaction, { accountId }: { accountId: string }): Promise<ProfileWithIdAndText[]> => {
    const acc = await account.get(tx, accountId);
    if (!acc) return [];
    const profiles = keyBy(await profile.list(tx), 'id');

    return acc.profileIds.reduce((acc: ProfileWithIdAndText[], profileId) => {
      const profile = profiles[profileId];
      if (!profile) return acc;
      return [...acc, { id: profile.id, text: profile.text }];
    }, []);
  },
  category: async (tx: ReadTransaction, id: string): Promise<CategoryDenormalized | undefined> => {
    const cat = await category.get(tx, id);
    if (!cat) return;
    const items = await Promise.all(cat.itemIds.map((itemId) => item.get(tx, itemId)));

    return {
      id: cat.id,
      items: items.filter((item) => item) as Item[],
      text: cat.text,
    };
  },
  checklist: async (tx: ReadTransaction, id: string): Promise<checklistTypes.ChecklistDenormalized | undefined> => {
    const che = await checklist.get(tx, id);
    if (!che) return;
    let itemsCount = 0;
    let itemsCompletedCount = 0;

    const categories = await Promise.all(
      che.includeCategoryIds.map(async (categoryId) => {
        const category = await queries.category(tx, categoryId);
        if (!category) return;

        let categoryItemsCompletedCount = 0;

        const items = category.items.reduce((acc: checklistTypes.ChecklistItem[], item) => {
          const split = item.text.split('  ');

          if (split.length < 2 || che.includeTags.some((tag) => split.slice(1).includes(tag))) {
            itemsCount++;
            const completed = che.completedItemIds.includes(String(item.id));
            if (completed) categoryItemsCompletedCount++;
            return [...acc, { ...Object(item), completed }];
          }

          return acc;
        }, []);

        itemsCompletedCount += categoryItemsCompletedCount;

        return {
          id: category.id,
          items,
          itemsCompletedCount: categoryItemsCompletedCount,
          text: category.text,
        };
      })
    );

    return {
      categories: categories.filter((category) => category) as ChecklistCategoryDenormalized[],
      completedItemIds: che.completedItemIds,
      id,
      includeCategoryIds: che.includeCategoryIds,
      includeTags: che.includeTags,
      itemsCompletedCount,
      itemsCount,
      text: che.text,
    };
  },
};

export default queries;
