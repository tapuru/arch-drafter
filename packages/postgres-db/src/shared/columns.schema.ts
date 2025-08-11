import { sql } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';

import { ctIsoDate, ctNullableIsoDate } from './custom-types.schema';

export const primaryKeyColumn = <T>(name: string) => uuid(name).$type<T>().primaryKey().defaultRandom();

export const createdAtColumn = (name: string) =>
  ctIsoDate(name)
    .default(sql`now()`)
    .notNull();

export const updatedAtColumn = (name: string) =>
  ctIsoDate(name)
    .default(sql`now()`)
    .$onUpdate(() => new Date().toISOString())
    .notNull();

export const deletedAtColumn = (name: string) => ctNullableIsoDate(name);
