import Config from './config';
import { Executor } from './transact';

const createSchemaVersion1 = async (executor: Executor) => {
  await executor(`
    create table meta(key text primary key, value json);
    insert into meta(key, value) values('schema_version', '1');
  `);

  await executor(`
    create table spaces (
      id text primary key not null,
      updated_at timestamp(6) not null,
      version integer not null
    );
    
    alter publication supabase_realtime add table spaces;
    alter publication supabase_realtime set(publish = 'insert, update, delete');
  `);

  await executor(`
    create table clients (
      id text primary key not null,
      last_mutation_id integer not null,
      updated_at timestamp(6) not null
    );
  `);

  await executor(`
    create table entries (
      deleted boolean not null,
      key text not null,
      space_id text not null,
      updated_at timestamp(6) not null,
      value text not null,
      version integer not null
    );
    
    create unique index on entries(space_id, key);
    create index on entries(space_id);
    create index on entries(deleted);
    create index on entries(version);
  `);
};

const migrations = async (executor: Executor, dbConfig: Config) => {
  const schemaVersion = await dbConfig.getSchemaVersion(executor);
  if (schemaVersion < 0 || schemaVersion > 1) throw new Error(`Unexpected schema version: ${schemaVersion}.`);
  if (schemaVersion === 0) await createSchemaVersion1(executor);
};

export default migrations;
