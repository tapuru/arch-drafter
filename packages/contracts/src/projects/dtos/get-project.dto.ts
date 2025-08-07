import { ProjectSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const GetProjectByIdRequestSchema = z.object({
  id: ProjectSchema.shape.id,
});

export type GetProjectByIdRequestDto = z.infer<typeof GetProjectByIdRequestSchema>;

export const parseGetProjectByIdRequest = (data: unknown): GetProjectByIdRequestDto =>
  GetProjectByIdRequestSchema.parse(data);

export const isGetProjectByIdRequest = (data: unknown): data is GetProjectByIdRequestDto =>
  GetProjectByIdRequestSchema.safeParse(data).success;
