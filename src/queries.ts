import keyBy from 'lodash/keyBy';
import { ReadonlyJSONValue, ReadTransaction } from 'replicache';
import account from './models/account';
import category, { CategoryDenormalized, CategoryMap } from './models/category';
import checklist, * as checklistTypes from './models/checklist';
import item, { Item, ItemMap } from './models/item';
import profile, { Profile, ProfileWithIdAndText } from './models/profile';

type CategoryAndItemMap = ReadonlyJSONValue & {
  categoryMap: CategoryMap;
  itemMap: ItemMap;
};

const queries = {
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

      return [
        ...acc,
        {
          id: checklist.id,
          itemsCompletedCount: checklist.itemsCompletedCount,
          itemsCount: checklist.itemsCount,
          text: checklist.text,
        },
      ];
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

        return {
          items: category.items.reduce((acc: checklistTypes.ChecklistItem[], item) => {
            const split = item.text.split('  ');

            if (split.length < 2 || che.includeTagIds.some((tag) => split.splice(1).includes(tag))) {
              itemsCount++;
              const completed = che.completedItemIds.includes(String(item.id));
              if (completed) itemsCompletedCount++;
              return [...acc, { ...Object(item), completed }];
            }

            return acc;
          }, []),
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
};

export default queries;
