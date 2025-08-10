import {
  UserId,
  Email,
  Password,
  UserName,
  IsoDate,
  UserGlobalRole,
  UserGlobalRoleSchema,
} from '@bc-arch-drafter/model';
import { boolean, pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('role_enum', [UserGlobalRoleSchema.enum.admin, UserGlobalRoleSchema.enum.user]);

export const users = pgTable('users', {
  id: uuid('id').$type<UserId>().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).$type<UserName>().notNull(),
  email: varchar('email', { length: 255 }).$type<Email>().notNull().unique(),
  password: varchar('password', { length: 255 }).$type<Password>().notNull(),
  role: userRole('role').$type<UserGlobalRole>().notNull().default(UserGlobalRoleSchema.enum.user),
  isVerified: boolean('is_verified').notNull().default(false),
  isBanned: boolean('is_banned').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).$type<IsoDate>().notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$type<IsoDate>().notNull().defaultNow(),
});
