import { UserId, TokenId, IsoDate, JwtToken, TokenTypeSchema, TokenType } from '@bc-arch-drafter/model';
import { boolean, pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from '@/users/users.schema';

export const tokenType = pgEnum('token_type', [TokenTypeSchema.enum.refresh, TokenTypeSchema.enum.verified]);

export const tokens = pgTable('tokens', {
  id: uuid('id').$type<TokenId>().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .$type<UserId>()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: tokenType('type').$type<TokenType>().notNull(),
  token: varchar('token', { length: 255 }).$type<JwtToken>().notNull(),
  isRevoked: boolean('is_revoked').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).$type<IsoDate>().notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).$type<IsoDate>().notNull(),
});
