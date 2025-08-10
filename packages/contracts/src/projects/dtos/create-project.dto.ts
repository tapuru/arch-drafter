import { ProjectSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const CreateProjectRequestSchema = z.object({
  name: ProjectSchema.shape.name,
  ownerId: ProjectSchema.shape.ownerId,
});
export type CreateProjectRequestDto = z.infer<typeof CreateProjectRequestSchema>;

export const parseCreateProjectRequest = (data: unknown): CreateProjectRequestDto =>
  CreateProjectRequestSchema.parse(data);

export const isCreateProjectRequest = (data: unknown): data is CreateProjectRequestDto =>
  CreateProjectRequestSchema.safeParse(data).success;
