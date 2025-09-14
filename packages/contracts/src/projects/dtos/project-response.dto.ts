import { ProjectSchema } from '@bc-arch-drafter/model';
import z from 'zod';

import { ApiSuccessResponseSchema } from '@/responses';

export const ProjectResponseSchema = ApiSuccessResponseSchema(ProjectSchema.omit({ deletedAt: true }));
export type ProjectResponseDto = z.infer<typeof ProjectResponseSchema>;
export const parseProjectResponse = (data: unknown) => ProjectResponseSchema.parse(data);
export const isProjectResponse = (data: unknown): data is ProjectResponseDto =>
  ProjectResponseSchema.safeParse(data).success;
