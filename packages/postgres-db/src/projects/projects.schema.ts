import { CanvasJson, ProjectId, ProjectName, UserId } from '@bc-arch-drafter/model';
import { jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { createdAtColumn, deletedAtColumn, primaryKeyColumn, updatedAtColumn } from '@/shared';

export const projects = pgTable('projects', {
  id: primaryKeyColumn<ProjectId>(),
  name: text().$type<ProjectName>().notNull(),
  canvasJson: jsonb().$type<CanvasJson>(),
  ownerId: uuid().$type<UserId>().notNull(),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
  deletedAt: deletedAtColumn(),
});
