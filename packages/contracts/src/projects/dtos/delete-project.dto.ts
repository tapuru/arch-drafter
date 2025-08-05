import z from 'zod';

export const DeleteProjectRequestSchema = z.object({
  id: z.uuid(),
});
export type DeleteProjectRequestDto = z.infer<typeof DeleteProjectRequestSchema>;
export const parseDeleteProjectRequest = (data: unknown): DeleteProjectRequestDto =>
  DeleteProjectRequestSchema.parse(data);
export const isDeleteProjectRequest = (data: unknown): data is DeleteProjectRequestDto =>
  DeleteProjectRequestSchema.safeParse(data).success;

export const DeleteProjectResponseSchema = z.object({
  success: z.boolean(),
});
export type DeleteProjectResponseDto = z.infer<typeof DeleteProjectResponseSchema>;
export const parseDeleteProjectResponse = (data: unknown): DeleteProjectResponseDto =>
  DeleteProjectResponseSchema.parse(data);
export const isDeleteProjectResponse = (data: unknown): data is DeleteProjectResponseDto =>
  DeleteProjectResponseSchema.safeParse(data).success;
