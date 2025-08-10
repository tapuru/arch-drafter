import { ProjectSchema, UserSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const UpdateProjectRequestSchema = z.object({
  id: ProjectSchema.shape.id,
  data: z
    .object({
      name: ProjectSchema.shape.name,
      ownerId: UserSchema.shape.id,
      canvasJson: ProjectSchema.shape.canvasJson,
    })
    .partial(),
});
export type UpdateProjectRequestDto = z.infer<typeof UpdateProjectRequestSchema>;
export const parseUpdateProjectRequest = (data: unknown) => UpdateProjectRequestSchema.parse(data);
export const isUpdateProjectRequest = (data: unknown): data is UpdateProjectRequestDto =>
  UpdateProjectRequestSchema.safeParse(data).success;
