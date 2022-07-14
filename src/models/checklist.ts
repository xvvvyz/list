import { ReadonlyJSONValue } from 'replicache';
import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';
import { CategoryDenormalized } from './category';
import { Item } from './item';

type Checklist = z.infer<typeof checklistSchema>;

type ChecklistDenormalized = ReadonlyJSONValue &
  Omit<Checklist, 'completedItemIds' | 'includeCategoryIds' | 'includeTagIds'> & {
    categories: CategoryDenormalized[];
    itemsCompletedCount: number;
    itemsCount: number;
  };

type ChecklistItem = Item & { completed: boolean };

const checklistSchema = entitySchema.extend({
  completedItemIds: z.string().array(),
  id: z.string(),
  includeCategoryIds: z.string().array(),
  includeTagIds: z.string().array(),
  text: z.string(),
});

const checklist = generate('checklist', checklistSchema);

export default checklist;
export type { Checklist, ChecklistDenormalized, ChecklistItem };
