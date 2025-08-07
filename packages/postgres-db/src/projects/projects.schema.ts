import { CanvasJson, IsoDate, NullableIsoDate, ProjectId, ProjectName, UserId } from '@bc-arch-drafter/model';
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: uuid().$type<ProjectId>().primaryKey().defaultRandom(),
  name: text().$type<ProjectName>().notNull(),
  //TODO: should be nullable or not?
  canvasJson: jsonb().$type<CanvasJson>(),
  ownerId: uuid().$type<UserId>().notNull(),
  createdAt: timestamp({ mode: 'string' }).$type<IsoDate>().notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).$type<IsoDate>().notNull().defaultNow(),
  deletedAt: timestamp({ mode: 'string' }).$type<NullableIsoDate>(),
});
