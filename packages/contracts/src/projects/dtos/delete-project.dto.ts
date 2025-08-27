import { ProjectSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const DeleteProjectRequestSchema = z.object({
  id: ProjectSchema.shape.id,
});
export type DeleteProjectRequestDto = z.infer<typeof DeleteProjectRequestSchema>;
export const parseDeleteProjectRequest = (data: unknown): DeleteProjectRequestDto =>
  DeleteProjectRequestSchema.parse(data);
export const isDeleteProjectRequest = (data: unknown): data is DeleteProjectRequestDto =>
  DeleteProjectRequestSchema.safeParse(data).success;
