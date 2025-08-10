import { sql } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';

import { ctIsoDate, ctNullableIsoDate } from './custom-types.schema';

export const primaryKeyColumn = <T>() => uuid().$type<T>().primaryKey().defaultRandom();

export const createdAtColumn = () =>
  ctIsoDate()
    .default(sql`now()`)
    .notNull();

export const updatedAtColumn = () =>
  ctIsoDate()
    .default(sql`now()`)
    .$onUpdate(() => new Date().toISOString())
    .notNull();

export const deletedAtColumn = () => ctNullableIsoDate();
