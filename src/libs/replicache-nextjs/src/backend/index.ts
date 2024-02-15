import type { NextApiRequest, NextApiResponse } from 'next';
import type { MutatorDefs } from 'replicache';
import { createSpace as createSpaceImpl, getCookie } from '../backend/data';
import { transact } from '../backend/pg';
import { handleRequest as handleRequestImpl } from '../endpoints/handle-request';

export async function spaceExists(spaceID: string) {
  const cookie = await transact(async (executor) => {
    return await getCookie(executor, spaceID);
  });
  return cookie !== undefined;
}

export async function createSpace(spaceID: string) {
  await transact(async (executor) => {
    await createSpaceImpl(executor, spaceID);
  });
}

export async function handleRequest<M extends MutatorDefs>(req: NextApiRequest, res: NextApiResponse, mutators: M) {
  await handleRequestImpl(req, res, mutators);
}
