import {
  InviteId,
  MemebershipId,
  ProjectId,
  UserId,
  UserProjectRole,
  UserProjectRoleSchema,
} from '@bc-arch-drafter/model';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core';

import { invites } from '@/invites';
import { projects } from '@/projects';
import { createdAtColumn, deletedAtColumn, idColumn, primaryKeyColumn } from '@/shared';
import { users } from '@/users';

export const userProjectRole = pgEnum('project_role_enum', [
  UserProjectRoleSchema.enum.member,
  UserProjectRoleSchema.enum.owner,
  UserProjectRoleSchema.enum.viewer,
]);

export const memberships = pgTable('memberships', {
  id: primaryKeyColumn<MemebershipId>('id'),
  role: userProjectRole('role').$type<UserProjectRole>().notNull().default(UserProjectRoleSchema.enum.viewer),
  projectId: uuid('project_id').$type<ProjectId>().notNull(),
  userId: uuid('user_id').$type<UserId>().notNull(),
  inviteId: idColumn<InviteId>('invite_id'),
  joinedAt: createdAtColumn('joined_at'),
  leftAt: deletedAtColumn('left_at'),
});

export const membershipsRelations = relations(memberships, ({ one }) => ({
  project: one(projects, {
    fields: [memberships.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
  invite: one(invites, {
    fields: [memberships.inviteId],
    references: [invites.id],
  }),
}));
