import { UserId, TokenId, JwtToken, TokenTypeSchema, TokenType, TokenUuid } from '@bc-arch-drafter/model';
import { relations } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';

import { createdAtColumn, idColumn, primaryKeyColumn, updatedAtColumn } from '@/shared';
import { users } from '@/users';

export const tokenType = pgEnum('token_type', [TokenTypeSchema.enum.refresh, TokenTypeSchema.enum.verified]);

export const tokens = pgTable('tokens', {
  id: primaryKeyColumn<TokenId>('id'),
  userId: idColumn<UserId>('user_id').notNull(),
  type: tokenType('type').$type<TokenType>().notNull(),
  token: varchar('token', { length: 255 }).$type<JwtToken>().notNull(),
  tokenUuid: varchar('token_uuid', { length: 255 }).$type<TokenUuid>().notNull(),
  isRevoked: boolean('is_revoked').notNull().default(false),
  createdAt: createdAtColumn('created_at'),
  expiresAt: updatedAtColumn('expires_at'),
});

export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
    relationName: 'user',
  }),
}));
