import { WriteTransaction } from 'replicache';
import { arrayMove } from '@dnd-kit/sortable';
import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';

const accountSchema = entitySchema.extend({
  id: z.string(),
  profileIds: z.string().array(),
});

type Account = z.infer<typeof accountSchema>;

const { get, put, update } = generate('account', accountSchema);

const accountMutations = {
  createAccount: async (tx: WriteTransaction, id: string) => {
    await put(tx, { id, profileIds: [] });
  },
  reorderProfile: async (
    tx: WriteTransaction,
    { accountId, fromIndex, toIndex }: { accountId: string; fromIndex: number; toIndex: number }
  ) => {
    const account = await get(tx, accountId);
    if (!account) return;

    await update(tx, {
      id: accountId,
      profileIds: arrayMove(account.profileIds, fromIndex, toIndex),
    });
  },
  updateAccount: update,
};

const accountQueries = {
  account: get,
};

export { accountMutations, accountQueries };
export type { Account };
