import z from 'zod';

export const ProjectResponseSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3).max(30),
  ownerId: z.uuid(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid ISO date' }),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid ISO date' }),
  deletedAt: z.string().nullable().optional(),
});
export type ProjectResponseDto = z.infer<typeof ProjectResponseSchema>;
export const parseProjectResponse = (data: unknown) => ProjectResponseSchema.parse(data);
export const isProjectResponse = (data: unknown): data is ProjectResponseDto =>
  ProjectResponseSchema.safeParse(data).success;
