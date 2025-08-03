import { CanvasJson, ProjectId, ProjectName } from '@bc-arch-drafter/model';
import { customType, pgTable } from 'drizzle-orm/pg-core';

import { ctIsoDate, ctNullableIsoDate } from './shared-custom-types.schema';
import { ctUserId } from './users.schema';

export const ctProjectId = customType<{ data: ProjectId }>({
  dataType: () => 'uuid',
  fromDriver: (val) => val as ProjectId,
});

export const ctProjectName = customType<{ data: ProjectName }>({
  dataType: () => 'varchar',
  fromDriver: (val) => val as ProjectName,
});

const ctCanvasJson = customType<{ data: CanvasJson }>({
  dataType: () => 'jsonb',
  fromDriver: (val) => val as CanvasJson,
});

export const projects = pgTable('projects', {
  id: ctProjectId().primaryKey(),
  name: ctProjectName().notNull(),
  //TODO: should be nullable or not?
  canvasJson: ctCanvasJson().notNull(),
  ownerId: ctUserId().notNull(),
  createdAt: ctIsoDate().notNull(),
  updatedAt: ctIsoDate().notNull(),
  deletedAt: ctNullableIsoDate(),
});
