import { ReadonlyJSONValue, ReadTransaction, WriteTransaction } from 'replicache';
import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';
import { CategoryDenormalized, categoryQueries } from './category';
import { ChecklistItem } from './item';
import { profileMutations, profileQueries } from './profile';

const checklistSchema = entitySchema.extend({
  completedItemIds: z.string().array(),
  id: z.string(),
  includeCategoryIds: z.string().array(),
  includeTagIds: z.string().array(),
  text: z.string(),
});

type Checklist = z.infer<typeof checklistSchema>;

type ChecklistDenormalized = ReadonlyJSONValue &
  Omit<Checklist, 'completedItemIds' | 'includeCategoryIds' | 'includeTagIds'> & {
    categories: CategoryDenormalized[];
    itemsCompletedCount: number;
    itemsCount: number;
  };

const { delete: deleteChecklist, get, put, update } = generate('checklist', checklistSchema);

const checklistMutations = {
  createChecklist: async (
    tx: WriteTransaction,
    { accountId, atBeginning, id }: { accountId: string; atBeginning?: boolean; id: string }
  ) => {
    const activeProfile = await profileQueries.activeProfile(tx, { accountId });
    if (!activeProfile) return;

    await put(tx, {
      completedItemIds: [],
      id,
      includeCategoryIds: [],
      includeTagIds: [],
      text: '',
    });

    await profileMutations.updateProfile(tx, {
      checklistIds: atBeginning ? [id, ...activeProfile.checklistIds] : [...activeProfile.checklistIds, id],
      id: activeProfile.id,
    });
  },
  deleteChecklist: async (tx: WriteTransaction, { accountId, id }: { accountId: string; id: string }) => {
    const activeProfile = await profileQueries.activeProfile(tx, { accountId });
    if (!activeProfile) return;
    await deleteChecklist(tx, id);

    await profileMutations.updateProfile(tx, {
      checklistIds: activeProfile.checklistIds.filter((checklistId) => checklistId !== id),
      id: activeProfile.id,
    });
  },
  updateChecklist: update,
};

const checklistQueries = {
  allChecklistDenormalized: async (
    tx: ReadTransaction,
    { accountId }: { accountId: string }
  ): Promise<ChecklistDenormalized[]> => {
    const activeProfile = await profileQueries.activeProfile(tx, { accountId });
    if (!activeProfile) return [];

    const checklists = await Promise.all(
      activeProfile.checklistIds.map((checklistId) => checklistQueries.checklistDenormalized(tx, checklistId))
    );

    return checklists.filter((checklist) => checklist) as ChecklistDenormalized[];
  },
  checklistDenormalized: async (tx: ReadTransaction, id: string): Promise<ChecklistDenormalized | undefined> => {
    const checklist = await get(tx, id);
    if (!checklist) return;
    let itemsCount = 0;
    let itemsCompletedCount = 0;

    const categories = await Promise.all(
      checklist.includeCategoryIds.map(async (categoryId) => {
        const category = await categoryQueries.categoryDenormalized(tx, categoryId);
        if (!category) return;

        return {
          items: category.items
            .filter((item) => {
              const include =
                !/ {2}.+/.test(item.text) ||
                checklist.includeTagIds.some((tag) => new RegExp(`${tag}($| {2})`).test(item.text));

              if (include) {
                itemsCount++;
                return true;
              }
            })
            .map((item) => {
              const completed = checklist.completedItemIds.includes(String(item.id));
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
      text: checklist.text,
    };
  },
};

export { checklistMutations, checklistQueries };
export type { Checklist, ChecklistDenormalized };
