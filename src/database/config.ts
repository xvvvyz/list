import { Pool } from 'pg';
import { Executor } from './transact';

class Config {
  private readonly _url: string;

  constructor() {
    const host = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL as string).hostname;
    const id = host.split('.')[0];
    this._url = `postgresql://postgres:${process.env.SUPABASE_DATABASE_PASSWORD}@db.${id}.supabase.co:5432/postgres`;
  }

  async getSchemaVersion(executor: Executor): Promise<number> {
    const metaExists = await executor(`select exists(
        select from pg_tables where schemaname = 'public' and tablename = 'meta')`);

    if (!metaExists.rows[0].exists) return 0;
    const qr = await executor(`select value from meta where key = 'schema_version'`);
    return qr.rows[0].value;
  }

  initPool(): Pool {
    return new Pool({
      connectionString: this._url,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    });
  }
}

export default Config;
