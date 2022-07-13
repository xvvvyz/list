import keyBy from 'lodash/keyBy';
import { ReadTransaction, WriteTransaction } from 'replicache';
import { arrayMove } from '@dnd-kit/sortable';
import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';
import { accountMutations, accountQueries } from './account';

const profileSchema = entitySchema.extend({
  categoryIds: z.string().array(),
  checklistIds: z.string().array(),
  id: z.string(),
  tags: z.object({}).optional(),
  text: z.string(),
});

type Profile = z.infer<typeof profileSchema>;

const { delete: deleteProfile, get, list, put, update } = generate('profile', profileSchema);

const profileMutations = {
  createProfile: async (tx: WriteTransaction, { accountId, id }: { accountId: string; id: string }) => {
    const account = await accountQueries.account(tx, accountId);
    if (!account) return;

    await put(tx, {
      categoryIds: [],
      checklistIds: [],
      id,
      tags: {},
      text: '',
    });

    await accountMutations.updateAccount(tx, {
      ...account,
      profileIds: [...account.profileIds, id],
    });
  },
  deleteProfile: async (tx: WriteTransaction, { accountId, id }: { accountId: string; id: string }) => {
    const account = await accountQueries.account(tx, accountId);
    if (!account) return;
    await deleteProfile(tx, id);

    await accountMutations.updateAccount(tx, {
      ...account,
      profileIds: account.profileIds.filter((profileId) => profileId !== id),
    });
  },
  reorderCategory: async (
    tx: WriteTransaction,
    { accountId, fromIndex, toIndex }: { accountId: string; fromIndex: number; toIndex: number }
  ) => {
    const activeProfile = await profileQueries.activeProfile(tx, { accountId });
    if (!activeProfile) return;

    await update(tx, {
      categoryIds: arrayMove(activeProfile.categoryIds, fromIndex, toIndex),
      id: accountId,
    });
  },
  updateProfile: update,
};

const profileQueries = {
  activeProfile: async (tx: ReadTransaction, { accountId }: { accountId: string }): Promise<Profile | undefined> => {
    const account = await accountQueries.account(tx, accountId);
    if (!account) return;
    const activeProfileId = account.profileIds[0];
    if (!activeProfileId) return;
    return await profileQueries.profile(tx, activeProfileId);
  },
  allProfile: async (tx: ReadTransaction, { accountId }: { accountId: string }): Promise<Profile[]> => {
    const account = await accountQueries.account(tx, accountId);
    if (!account) return [];
    const profiles = keyBy(await list(tx), 'id');
    return account.profileIds.map((profileId) => profiles[profileId]).filter((profile) => profile);
  },
  profile: get,
};

export { profileMutations, profileQueries };
export type { Profile };
