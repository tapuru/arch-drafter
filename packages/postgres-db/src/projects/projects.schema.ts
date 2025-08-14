import { CanvasJson, ProjectId, ProjectName, UserId } from '@bc-arch-drafter/model';
import { relations } from 'drizzle-orm';
import { jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { invites } from '@/invites';
import { memberships } from '@/memberships';
import { createdAtColumn, deletedAtColumn, primaryKeyColumn, updatedAtColumn } from '@/shared';
import { users } from '@/users';

export const projects = pgTable('projects', {
  id: primaryKeyColumn<ProjectId>('id'),
  name: text('name').$type<ProjectName>().notNull(),
  canvasJson: jsonb('canvas_json').$type<CanvasJson>(),
  ownerId: uuid('owner_id').$type<UserId>().notNull(),
  createdAt: createdAtColumn('created_at'),
  updatedAt: updatedAtColumn('updated_at'),
  deletedAt: deletedAtColumn('deleted_at'),
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
  members: many(memberships),
  invites: many(invites),
  owner: one(users, {
    fields: [projects.ownerId],
    references: [users.id],
  }),
}));
