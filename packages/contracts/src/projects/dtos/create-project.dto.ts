import z from 'zod';

export const CreateProjectRequestSchema = z.object({
  name: z.string().min(3).max(30),
  ownerId: z.uuid(),
});
export type CreateProjectRequestDto = z.infer<typeof CreateProjectRequestSchema>;

export const parseCreateProjectRequest = (data: unknown): CreateProjectRequestDto =>
  CreateProjectRequestSchema.parse(data);

export const isCreateProjectRequest = (data: unknown): data is CreateProjectRequestDto =>
  CreateProjectRequestSchema.safeParse(data).success;
