import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';

type Item = z.infer<typeof itemSchema>;
type ItemMap = Record<string, Item>;

const itemSchema = entitySchema.extend({
  id: z.string(),
  text: z.string(),
});

const item = generate('item', itemSchema);

export default item;
export type { Item, ItemMap };
