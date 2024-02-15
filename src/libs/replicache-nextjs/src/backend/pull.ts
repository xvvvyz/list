import type { NextApiRequest } from 'next';
import type { PullResponse } from 'replicache';
import { z } from 'zod';
import { getChangedEntries, getCookie, getLastMutationID } from './data';
import { transact } from './pg';

const pullRequest = z.object({
  clientID: z.string(),
  cookie: z.union([z.number(), z.null()]),
});

export async function pull(spaceID: string, requestBody: NextApiRequest): Promise<PullResponse> {
  console.log(`Processing pull`, JSON.stringify(requestBody, null, ''));

  const pull = pullRequest.parse(requestBody);
  const requestCookie = pull.cookie;

  console.log('spaceID', spaceID);
  console.log('clientID', pull.clientID);

  const t0 = Date.now();

  const [entries, lastMutationID, responseCookie] = await transact(async (executor) => {
    return Promise.all([
      getChangedEntries(executor, spaceID, requestCookie ?? 0),
      getLastMutationID(executor, pull.clientID),
      getCookie(executor, spaceID),
    ]);
  });

  console.log('lastMutationID: ', lastMutationID);
  console.log('responseCookie: ', responseCookie);
  console.log('Read all objects in', Date.now() - t0);

  if (responseCookie === undefined) {
    throw new Error(`Unknown space ${spaceID}`);
  }

  const resp: PullResponse = { cookie: responseCookie, lastMutationID: lastMutationID ?? 0, patch: [] };

  for (const [key, value, deleted] of entries) {
    if (deleted) {
      resp.patch.push({ key, op: 'del' });
    } else {
      resp.patch.push({ key, op: 'put', value });
    }
  }

  console.log(`Returning`, JSON.stringify(resp, null, ''));
  return resp;
}
