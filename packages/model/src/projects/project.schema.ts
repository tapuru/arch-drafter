import z from 'zod';

import { BaseIdSchema, IsoDateSchema, NullableIsoDateSchema } from '@/shared';
import { UserSchema } from '@/users';

export const ProjectIdSchema = BaseIdSchema.brand<'ProjectId'>();
export type ProjectId = z.infer<typeof ProjectIdSchema>;
export const parseProjectId = (data: unknown) => ProjectIdSchema.parse(data);
export const isProjectId = (data: unknown): data is ProjectId => ProjectIdSchema.safeParse(data).success;

export const ProjectNameSchema = z
  .string({ error: 'Project name must be a string' })
  .min(3, 'Project name must be least 3 characters long')
  .max(30, 'Project name must be shorter than 30 characters');
export type ProjectName = z.infer<typeof ProjectNameSchema>;
export const parseProjectName = (data: unknown) => ProjectNameSchema.parse(data);
export const isProjectName = (data: unknown): data is ProjectName => ProjectNameSchema.safeParse(data).success;

//TODO: write canvasJson type
export const CanvasJsonSchema = z.record(z.any(), z.any());
export type CanvasJson = z.infer<typeof CanvasJsonSchema>;
export const parseCanvasJson = (data: unknown) => CanvasJsonSchema.parse(data);
export const isCanvasJson = (data: unknown): data is CanvasJson => CanvasJsonSchema.safeParse(data).success;

export const ProjectSchema = z.object({
  id: ProjectIdSchema,
  name: ProjectNameSchema,
  ownerId: UserSchema.shape.id,
  canvasJson: CanvasJsonSchema.nullable(),
  createdAt: IsoDateSchema,
  updatedAt: IsoDateSchema,
  deletedAt: NullableIsoDateSchema,
});

export type Project = z.infer<typeof ProjectSchema>;
export const parseProject = (data: unknown) => ProjectSchema.parse(data);
export const isProject = (data: unknown): data is Project => ProjectSchema.safeParse(data).success;
