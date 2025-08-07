import z from 'zod';

import { BaseIdSchema, IsoDateSchema, NullableIsoDateSchema } from '@/shared';
import { UserSchema } from '@/users';

export const ProjectIdSchema = BaseIdSchema.brand<'ProjectId'>();
export type ProjectId = z.infer<typeof ProjectIdSchema>;

export const ProjectNameSchema = z.string().min(3).max(30);
export type ProjectName = z.infer<typeof ProjectNameSchema>;

//TODO: write canvasJson type
export const CanvasJsonSchema = z.record(z.any(), z.any());
export type CanvasJson = z.infer<typeof CanvasJsonSchema>;

export const ProjectSchema = z.object({
  id: ProjectIdSchema,
  name: ProjectNameSchema,
  ownerId: UserSchema.shape.id,
  canvasJson: CanvasJsonSchema,
  createdAt: IsoDateSchema,
  updatedAt: IsoDateSchema,
  deletedAt: NullableIsoDateSchema,
});

export type Project = z.infer<typeof ProjectSchema>;
