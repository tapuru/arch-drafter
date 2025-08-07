import { ProjectSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const UpdateProjectRequestSchema = z.object({
  name: ProjectSchema.shape.name.min(3, 'min 3').max(30, 'max 10'),
  canvasJson: ProjectSchema.shape.canvasJson,
});
export type UpdateProjectRequestDto = z.infer<typeof UpdateProjectRequestSchema>;
export const parseUpdateProjectRequest = (data: unknown) => UpdateProjectRequestSchema.parse(data);
export const isUpdateProjectRequest = (data: unknown): data is UpdateProjectRequestDto =>
  UpdateProjectRequestSchema.safeParse(data).success;
