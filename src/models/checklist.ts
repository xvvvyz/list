import { entitySchema, generate } from '@rocicorp/rails';
import { ReadonlyJSONValue } from 'replicache';
import { z } from 'zod';
import { ChecklistCategoryDenormalized } from './category';
import { Item } from './item';

type Checklist = z.infer<typeof checklistSchema>;

type ChecklistDenormalized = ReadonlyJSONValue &
  Checklist & {
    availableTags: string[];
    categories: ChecklistCategoryDenormalized[];
    itemsCompletedCount: number;
    itemsCount: number;
  };

type ChecklistDenormalizedWithoutCategories = Omit<ChecklistDenormalized, 'categories'>;
type ChecklistItem = Item & { completed: boolean; number: number };

const checklistSchema = entitySchema.extend({
  completedItemIds: z.string().array(),
  id: z.string(),
  includeCategoryIds: z.string().array(),
  includeTags: z.string().array(),
  text: z.string(),
});

const checklist = generate('checklist', checklistSchema);

export default checklist;
export type { Checklist, ChecklistDenormalized, ChecklistDenormalizedWithoutCategories, ChecklistItem };
