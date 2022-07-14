import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';

const accountSchema = entitySchema.extend({
  id: z.string(),
  profileIds: z.string().array(),
});

const account = generate('account', accountSchema);

export default account;
