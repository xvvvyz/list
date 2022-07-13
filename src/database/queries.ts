import { JSONValue } from 'replicache';
import { z } from 'zod';
import { Executor } from './transact';

export const createSpace = async (executor: Executor, spaceId: string): Promise<void> => {
  await executor(`insert into spaces (id, version, updated_at) values ($1, 0, now())`, [spaceId]);
};

export const deleteEntry = async (executor: Executor, spaceId: string, key: string, version: number): Promise<void> => {
  await executor(`update entries set deleted = true, version = $3 where space_id = $1 and key = $2`, [
    spaceId,
    key,
    version,
  ]);
};

export const getChangedEntries = async (
  executor: Executor,
  spaceId: string,
  prevVersion: number
): Promise<[key: string, value: JSONValue, deleted: boolean][]> => {
  const { rows } = await executor(`select key, value, deleted from entries where space_id = $1 and version > $2`, [
    spaceId,
    prevVersion,
  ]);

  return rows.map((row) => [row.key, JSON.parse(row.value), row.deleted]);
};

export const getCookie = async (executor: Executor, spaceId: string): Promise<number | undefined> => {
  const { rows } = await executor(`select version from spaces where id = $1`, [spaceId]);
  const value = rows[0]?.version;
  if (value === undefined) return undefined;
  return z.number().parse(value);
};

export async function* getEntries(
  executor: Executor,
  spaceId: string,
  fromKey: string
): AsyncIterable<readonly [string, JSONValue]> {
  const { rows } = await executor(
    `select key, value from entries where space_id = $1 and key >= $2 and deleted = false order by key`,
    [spaceId, fromKey]
  );

  for (const row of rows) {
    yield [row.key as string, JSON.parse(row.value) as JSONValue] as const;
  }
}

export const getEntry = async (executor: Executor, spaceId: string, key: string): Promise<JSONValue | undefined> => {
  const { rows } = await executor('select value from entries where space_id = $1 and key = $2 and deleted = false', [
    spaceId,
    key,
  ]);

  const value = rows[0]?.value;
  if (value === undefined) return undefined;
  return JSON.parse(value);
};

export const getLastMutationId = async (executor: Executor, clientId: string): Promise<number | undefined> => {
  const { rows } = await executor(`select last_mutation_id from clients where id = $1`, [clientId]);
  const value = rows[0]?.last_mutation_id;
  if (value === undefined) return undefined;
  return z.number().parse(value);
};

export const putEntry = async (
  executor: Executor,
  spaceId: string,
  key: string,
  value: JSONValue,
  version: number
): Promise<void> => {
  await executor(
    `
      insert into entries (space_id, key, value, deleted, version, updated_at)
      values ($1, $2, $3, false, $4, now())
        on conflict (space_id, key) do update set
          value = $3, deleted = false, version = $4, updated_at = now()
    `,
    [spaceId, key, JSON.stringify(value), version]
  );
};

export const setCookie = async (executor: Executor, spaceId: string, version: number): Promise<void> => {
  await executor(`update spaces set version = $2, updated_at = now() where id = $1`, [spaceId, version]);
};

export const setLastMutationId = async (
  executor: Executor,
  clientId: string,
  lastMutationId: number
): Promise<void> => {
  await executor(
    `
      insert into clients (id, last_mutation_id, updated_at)
      values ($1, $2, now())
        on conflict (id) do update set last_mutation_id = $2, updated_at = now()
    `,
    [clientId, lastMutationId]
  );
};
