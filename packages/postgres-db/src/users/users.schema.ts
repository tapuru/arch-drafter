import { UserId, Email, Password, UserName, UserGlobalRole, UserGlobalRoleSchema } from '@bc-arch-drafter/model';
import { boolean, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';

import { createdAtColumn, primaryKeyColumn, updatedAtColumn } from '@/shared';

export const userRole = pgEnum('role_enum', [UserGlobalRoleSchema.enum.admin, UserGlobalRoleSchema.enum.user]);

export const users = pgTable('users', {
  id: primaryKeyColumn<UserId>('id'),
  name: varchar('name', { length: 255 }).$type<UserName>().notNull(),
  email: varchar('email', { length: 255 }).$type<Email>().notNull().unique(),
  password: varchar('password', { length: 255 }).$type<Password>().notNull(),
  role: userRole('role').$type<UserGlobalRole>().notNull().default(UserGlobalRoleSchema.enum.user),
  isVerified: boolean('is_verified').notNull().default(false),
  isBanned: boolean('is_banned').notNull().default(false),
  createdAt: createdAtColumn('created_at'),
  updatedAt: updatedAtColumn('updated_at'),
});
