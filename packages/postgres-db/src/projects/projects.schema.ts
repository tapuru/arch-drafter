import { pgTable } from 'drizzle-orm/pg-core';

import { ctIsoDate, ctNullableIsoDate } from '../shared';
//TODO: fix import aliases
import { ctUserId } from '../users';
import { ctCanvasJson, ctProjectId, ctProjectName } from './projects-custom-types';

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
