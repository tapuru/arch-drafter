import z from 'zod';

export const ApiErrorSchema = z.object({
  field: z.string().nullable(),
  message: z.string(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;
export const parseApiError = (data: unknown): ApiError => ApiErrorSchema.parse(data);
export const isApiError = (data: unknown): data is ApiError => ApiErrorSchema.safeParse(data).success;
