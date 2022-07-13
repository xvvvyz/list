import { NextApiHandler } from 'next';
import { parseIfDebug } from '@rocicorp/rails';
import { z } from 'zod';
import Transaction from '../../database/transaction';
import mutations, { Mutations } from '../../mutations';
import transact from '../../database/transact';
import { getCookie, getLastMutationId, setCookie, setLastMutationId } from '../../database/queries';

const handler: NextApiHandler = async (req, res) => {
  const spaceId = req.query['spaceId'] as string;
  if (!spaceId) throw new Error('spaceId required');

  const parsedPush = parseIfDebug(
    z.object({
      clientID: z.string(),
      mutations: z.array(
        z.object({
          args: z.any(),
          id: z.number(),
          name: z.string(),
        })
      ),
    }),
    req.body
  );

  await transact(async (executor) => {
    const prevVersion = await getCookie(executor, spaceId);
    if (prevVersion === undefined) throw new Error('Invalid space.');

    const nextVersion = prevVersion + 1;
    const tx = new Transaction(executor, spaceId, parsedPush.clientID, nextVersion);
    let lastMutationId = (await getLastMutationId(executor, parsedPush.clientID)) ?? 0;

    for (let i = 0; i < parsedPush.mutations.length; i++) {
      const mutation = parsedPush.mutations[i];
      const expectedMutationID = lastMutationId + 1;
      if (mutation.id < expectedMutationID) continue;
      if (mutation.id > expectedMutationID) break;
      const mutator = mutations[mutation.name as keyof Mutations];
      await mutator(tx, mutation.args);
      lastMutationId = expectedMutationID;
    }

    await Promise.all([
      setLastMutationId(executor, parsedPush.clientID, lastMutationId),
      setCookie(executor, spaceId, nextVersion),
      tx.flush(),
    ]);
  });

  res.status(200).json({});
};

export default handler;
