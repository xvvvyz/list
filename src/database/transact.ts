import { DatabaseError, Pool, QueryResult } from 'pg';
import Config from './config';
import migrations from './migrations';

type Executor = (sql: string, params?: unknown[]) => Promise<QueryResult>;
type TransactionBodyFn<R> = (executor: Executor) => Promise<R>;

const transactWithExecutor = async <R>(executor: Executor, body: TransactionBodyFn<R>) => {
  for (let i = 0; i < 10; i++) {
    try {
      await executor('begin');

      try {
        const r = await body(executor);
        await executor('commit');
        return r;
      } catch (e) {
        await executor('rollback');
        throw e;
      }
    } catch (e) {
      // https://stackoverflow.com/questions/60339223/node-js-transaction-coflicts-in-postgresql-optimistic-concurrency-control-and
      const code = typeof e === 'object' ? String((e as DatabaseError).code) : null;
      if (code === '40001' || code === '40P01') continue;
      throw e;
    }
  }

  throw new Error('Tried to execute transaction too many times. Giving up.');
};

const withExecutorAndPool = async <R>(run: (executor: Executor) => R, pool: Pool): Promise<R> => {
  const client = await pool.connect();

  try {
    return run((sql: string, params?: unknown[]) => {
      try {
        return client.query(sql, params);
      } catch (e) {
        throw new Error(`Error executing SQL: ${sql}: ${(e as DatabaseError).toString()}.`);
      }
    });
  } finally {
    client.release();
  }
};

const pool = (async () => {
  const global = globalThis as unknown as { _pool: Pool };

  if (!global._pool) {
    const dbConfig = new Config();
    global._pool = dbConfig.initPool();

    // the pool will emit an error on behalf of any idle clients
    // it contains if a server error or network partition happens
    global._pool.on('error', (err) => {
      console.error('Unexpected error on idle client.', err);
      process.exit(-1);
    });

    global._pool.on('connect', (client) =>
      client.query('SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL SERIALIZABLE')
    );

    await withExecutorAndPool(
      (executor) => transactWithExecutor(executor, (executor) => migrations(executor, dbConfig)),
      global._pool
    );
  }

  return global._pool;
})();

/**
 * Invokes a supplied function within a transaction.
 * @param body Function to invoke. If this throws, the transaction will be
 * rolled back. The thrown error will be re-thrown.
 */
const transact = async <R>(body: TransactionBodyFn<R>) => {
  return withExecutorAndPool((executor) => transactWithExecutor(executor, body), await pool);
};

export default transact;
export type { Executor };
