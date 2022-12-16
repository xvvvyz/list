import { entitySchema, generate } from '@rocicorp/rails';
import { ReadonlyJSONValue } from 'replicache';
import { z } from 'zod';
import { ChecklistItem } from './checklist';
import { Item } from './item';

type Category = z.infer<typeof categorySchema>;
type CategoryDenormalized = ReadonlyJSONValue & Omit<Category, 'itemIds'> & { items: Item[] };
type CategoryMap = Record<string, Category>;

type ChecklistCategoryDenormalized = ReadonlyJSONValue &
  Omit<Category, 'itemIds'> & { items: ChecklistItem[]; itemsCompletedCount: number };

const categorySchema = entitySchema.extend({
  id: z.string(),
  itemIds: z.string().array(),
  text: z.string(),
});

const category = generate('category', categorySchema);

export default category;
export type { Category, CategoryDenormalized, CategoryMap, ChecklistCategoryDenormalized };
