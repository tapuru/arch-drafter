import z from 'zod';

export const GetProjectByIdRequestSchema = z.object({
  id: z.uuid(),
});

export type GetProjectByIdRequestDto = z.infer<typeof GetProjectByIdRequestSchema>;

export const parseGetProjectByIdRequest = (data: unknown): GetProjectByIdRequestDto =>
  GetProjectByIdRequestSchema.parse(data);

export const isGetProjectByIdRequest = (data: unknown): data is GetProjectByIdRequestDto =>
  GetProjectByIdRequestSchema.safeParse(data).success;
