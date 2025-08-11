import z, { success } from 'zod';

import { ApiErrorSchema } from './api-error.schema';

export const ApiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.discriminatedUnion('success', [
    z.object({
      success: z.literal(false),
      data: data,
    }),
    z.object({
      success: z.literal(false),
      errors: z.array(ApiErrorSchema),
    }),
  ]);

export type ApiResponse<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>;

export const parseApiResponse =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): ApiResponse<T> =>
    ApiResponseSchema(schema).parse(data);

export const isApiResponse =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): data is ApiResponse<T> =>
    ApiResponseSchema(schema).safeParse(data).success;
