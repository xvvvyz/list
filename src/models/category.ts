import { ReadonlyJSONValue } from 'replicache';
import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';
import { ChecklistItem } from './checklist';
import { Item } from './item';

type Category = z.infer<typeof categorySchema>;
type CategoryDenormalized = ReadonlyJSONValue & Omit<Category, 'itemIds'> & { items: (Item | ChecklistItem)[] };
type CategoryMap = Record<string, Category>;

const categorySchema = entitySchema.extend({
  id: z.string(),
  itemIds: z.string().array(),
  text: z.string(),
});

const category = generate('category', categorySchema);

export default category;
export type { Category, CategoryDenormalized, CategoryMap };
