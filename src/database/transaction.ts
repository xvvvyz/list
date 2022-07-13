import * as R from 'replicache';
import { Executor } from './transact';
import { deleteEntry, getEntries, getEntry, putEntry } from './queries';

type CacheMap = Map<string, { value: R.JSONValue | undefined; dirty: boolean }>;

class Transaction implements R.WriteTransaction {
  private readonly _clientId: string;
  private readonly _executor: Executor;
  private readonly _spaceId: string;
  private readonly _version: number;
  private _cache: CacheMap = new Map();

  constructor(executor: Executor, spaceId: string, clientId: string, version: number) {
    this._spaceId = spaceId;
    this._clientId = clientId;
    this._version = version;
    this._executor = executor;
  }

  get clientID(): string {
    return this._clientId;
  }

  async del(key: string): Promise<boolean> {
    const had = await this.has(key);
    this._cache.set(key, { dirty: true, value: undefined });
    return had;
  }

  async flush(): Promise<void> {
    await Promise.all(
      Array.from(this._cache.entries())
        .filter(([, { dirty }]) => dirty)
        .map(([k, { value }]) => {
          if (value === undefined) {
            return deleteEntry(this._executor, this._spaceId, k, this._version);
          } else {
            return putEntry(this._executor, this._spaceId, k, value, this._version);
          }
        })
    );
  }

  async get(key: string): Promise<R.JSONValue | undefined> {
    const entry = this._cache.get(key);
    if (entry) return entry.value;
    const value = await getEntry(this._executor, this._spaceId, key);
    this._cache.set(key, { dirty: false, value });
    return value;
  }

  async has(key: string): Promise<boolean> {
    const val = await this.get(key);
    return val !== undefined;
  }

  async isEmpty(): Promise<boolean> {
    for await (const _ of this.scan()) return false;
    return true;
  }

  async put(key: string, value: R.JSONValue): Promise<void> {
    this._cache.set(key, { dirty: true, value });
  }

  scan(options: R.ScanOptions = {} as R.ScanNoIndexOptions) {
    if (R.isScanIndexOptions(options)) {
      throw new Error('Not implemented.');
    }

    const { _executor: executor, _spaceId: spaceId, _cache: cache } = this;

    return R.makeScanResult<R.ScanNoIndexOptions, R.JSONValue>(options, (fromKey: string) => {
      const source = getEntries(executor, spaceId, fromKey);
      const pending = Transaction.getCacheEntries(cache, fromKey);
      const merged = R.mergeAsyncIterables(source, pending, Transaction.entryCompare);

      return R.filterAsyncIterable(merged, (entry) => entry[1] !== undefined) as AsyncIterable<
        readonly [string, R.JSONValue]
      >;
    });
  }

  static entryCompare(a: readonly [string, unknown], b: readonly [string, unknown]): number {
    return Transaction.stringCompare(a[0], b[0]);
  }

  static getCacheEntries(cache: CacheMap, fromKey: string): Iterable<readonly [string, R.JSONValue | undefined]> {
    const entries = [];

    for (const [key, { value, dirty }] of Array.from(cache)) {
      if (dirty && Transaction.stringCompare(key, fromKey) >= 0) {
        entries.push([key, value] as const);
      }
    }

    entries.sort((a, b) => Transaction.stringCompare(a[0], b[0]));
    return entries;
  }

  static stringCompare(a: string, b: string): number {
    return a === b ? 0 : a < b ? -1 : 1;
  }
}

export default Transaction;
