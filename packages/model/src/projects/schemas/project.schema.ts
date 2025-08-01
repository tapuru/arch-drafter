import z from 'zod';

import { AppIdSchema, IsoDateSchema, NullableIsoDateSchema } from '@/shared';
import { UserSchema } from '@/users';

export const ProjectNameSchema = z.string().min(3).max(30);
export type ProjectName = z.infer<typeof ProjectNameSchema>;

//TODO: write canvasJson type
export const CanvasJsonSchema = z.json();
export type CanvasJson = z.infer<typeof CanvasJsonSchema>;

export const ProjectSchema = z.object({
  id: AppIdSchema,
  name: ProjectNameSchema,
  ownerId: UserSchema.shape.id,
  canvasJson: CanvasJsonSchema,
  createdAt: IsoDateSchema,
  updatedAt: IsoDateSchema,
  deletedAt: NullableIsoDateSchema,
});

export type Project = z.infer<typeof ProjectSchema>;
