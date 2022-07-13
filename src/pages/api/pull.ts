import { NextApiHandler } from 'next';
import { PullResponse } from 'replicache';
import { z } from 'zod';
import transact from '../../database/transact';
import { getChangedEntries, getCookie, getLastMutationId } from '../../database/queries';

const handler: NextApiHandler = async (req, res) => {
  const spaceId = req.query['spaceId'] as string;
  if (!spaceId) throw new Error('spaceId required');

  const parsedPull = z
    .object({
      clientID: z.string(),
      cookie: z.union([z.number(), z.null()]),
    })
    .parse(req.body);

  const requestCookie = parsedPull.cookie;

  const [entries, lastMutationId, responseCookie] = await transact(async (executor) =>
    Promise.all([
      getChangedEntries(executor, spaceId, requestCookie ?? 0),
      getLastMutationId(executor, parsedPull.clientID),
      getCookie(executor, spaceId),
    ])
  );

  if (responseCookie === undefined) throw new Error('Invalid space.');

  const pullRes: PullResponse = {
    cookie: responseCookie,
    lastMutationID: lastMutationId ?? 0,
    patch: [],
  };

  entries.forEach(([key, value, deleted]) => {
    if (deleted) pullRes.patch.push({ key, op: 'del' });
    else pullRes.patch.push({ key, op: 'put', value });
  });

  res.status(200).json(pullRes);
};

export default handler;
