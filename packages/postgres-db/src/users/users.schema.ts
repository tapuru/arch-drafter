import { UserId, Email, Password, UserName, UserGlobalRole, UserGlobalRoleSchema } from '@bc-arch-drafter/model';
import { relations } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';

import { invites } from '@/invites';
import { memberships } from '@/memberships';
import { createdAtColumn, primaryKeyColumn, updatedAtColumn, deletedAtColumn } from '@/shared';

import { tokens } from '../tokens/token.schema';

export const userRole = pgEnum('role_enum', [UserGlobalRoleSchema.enum.admin, UserGlobalRoleSchema.enum.user]);

export const users = pgTable('users', {
  id: primaryKeyColumn<UserId>('id'),
  name: varchar('name', { length: 255 }).$type<UserName>().notNull(),
  email: varchar('email', { length: 255 }).$type<Email>().notNull().unique(),
  password: varchar('password', { length: 255 }).$type<Password>().notNull(),
  role: userRole('role').$type<UserGlobalRole>().notNull().default(UserGlobalRoleSchema.enum.user),
  isVerified: boolean('is_verified').notNull().default(false),
  isBanned: boolean('is_banned').notNull().default(false),
  deleteAt: deletedAtColumn('deleted_at'),
  createdAt: createdAtColumn('created_at'),
  updatedAt: updatedAtColumn('updated_at'),
});

export const usersRelations = relations(users, ({ many }) => ({
  sentInvites: many(invites, { relationName: 'user' }),
  invites: many(invites, { relationName: 'sender' }),
  tokens: many(tokens, { relationName: 'token' }),
  memberships: many(memberships),
}));
