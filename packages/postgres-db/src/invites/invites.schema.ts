import {
  InviteId,
  InviteStatusSchema,
  ProjectId,
  UserId,
  InviteStatus,
  MemebershipId,
  UserProjectRoleSchema,
  UserProjectRole,
} from '@bc-arch-drafter/model';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable } from 'drizzle-orm/pg-core';

import { userProjectRole } from '@/memberships';
import { projects } from '@/projects';
import { createdAtColumn, ctNullableIsoDate, deletedAtColumn, idColumn, primaryKeyColumn } from '@/shared';
import { users } from '@/users';

export const inviteStatus = pgEnum('invite_status', [
  InviteStatusSchema.enum.pending,
  InviteStatusSchema.enum.accepted,
  InviteStatusSchema.enum.rejected,
  InviteStatusSchema.enum.canceled,
]);

export const invites = pgTable('invites', {
  id: primaryKeyColumn<InviteId>('id'),
  projectId: idColumn<ProjectId>('project_id').notNull(),
  senderId: idColumn<UserId>('sender_id').notNull(),
  userId: idColumn<UserId>('user_id').notNull(),
  status: inviteStatus('status').$type<InviteStatus>().notNull().default(InviteStatusSchema.enum.pending),
  sentAt: createdAtColumn('sent_at'),
  role: userProjectRole('role').$type<UserProjectRole>().notNull().default(UserProjectRoleSchema.enum.viewer),
  acceptedAt: ctNullableIsoDate('accepted_at').default(null),
  rejectedAt: ctNullableIsoDate('rejected_at').default(null),
  canceledAt: deletedAtColumn('canceled_at'),
});

export const invitesRelations = relations(invites, ({ one }) => ({
  project: one(projects, {
    fields: [invites.projectId],
    references: [projects.id],
  }),
  sender: one(users, {
    fields: [invites.senderId],
    references: [users.id],
    relationName: 'sender',
  }),
  user: one(users, {
    fields: [invites.userId],
    references: [users.id],
    relationName: 'user',
  }),
}));
