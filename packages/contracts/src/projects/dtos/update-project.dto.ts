import z from 'zod';

export const UpdateProjectRequestSchema = z.object({
  name: z.string().min(3).max(30),
  //TODO: type for canvasJson
  canvasJson: z.record(z.string(), z.any()),
});
export type UpdateProjectRequestDto = z.infer<typeof UpdateProjectRequestSchema>;
export const parseUpdateProjectRequest = (data: unknown) => UpdateProjectRequestSchema.parse(data);
export const isUpdateProjectRequest = (data: unknown): data is UpdateProjectRequestDto =>
  UpdateProjectRequestSchema.safeParse(data).success;
