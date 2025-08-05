import z from 'zod';

import { ApiErrorSchema } from './api-error.schema';

//TODO: use descriminatedUnion
export const ApiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.boolean(),
    data: data.optional(),
    errors: z.array(ApiErrorSchema).optional(),
  });
export type ApiResponse<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>;

export const parseApiResponse =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): ApiResponse<T> =>
    ApiResponseSchema(schema).parse(data);

export const isApiResponse =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): data is ApiResponse<T> =>
    ApiResponseSchema(schema).safeParse(data).success;
