import { UserId, TokenId, JwtToken, TokenTypeSchema, TokenType } from '@bc-arch-drafter/model';
import { boolean, pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { createdAtColumn, primaryKeyColumn, updatedAtColumn } from '@/shared';
import { users } from '@/users/users.schema';

export const tokenType = pgEnum('token_type', [TokenTypeSchema.enum.refresh, TokenTypeSchema.enum.verified]);

export const tokens = pgTable('tokens', {
  id: primaryKeyColumn<TokenId>('id'),
  userId: uuid('user_id')
    .$type<UserId>()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: tokenType('type').$type<TokenType>().notNull(),
  token: varchar('token', { length: 255 }).$type<JwtToken>().notNull(),
  isRevoked: boolean('is_revoked').notNull().default(false),
  createdAt: createdAtColumn('created_at'),
  expiresAt: updatedAtColumn('expires_at'),
});
