import { CanvasJson, ProjectId, ProjectName, UserId } from '@bc-arch-drafter/model';
import { jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { createdAtColumn, deletedAtColumn, primaryKeyColumn, updatedAtColumn } from '@/shared';

export const projects = pgTable('projects', {
  id: primaryKeyColumn<ProjectId>('id'),
  name: text('name').$type<ProjectName>().notNull(),
  canvasJson: jsonb('canvas_json').$type<CanvasJson>(),
  ownerId: uuid('owner_id').$type<UserId>().notNull(),
  createdAt: createdAtColumn('created_at'),
  updatedAt: updatedAtColumn('updated_at'),
  deletedAt: deletedAtColumn('deleted_at'),
});
