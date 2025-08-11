import { z } from 'zod';

import { ApiErrorResponseSchema } from './api-error-response.schema';
import { ApiSuccessResponseSchema } from './api-success-response.schema';

export const ApiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.discriminatedUnion('success', [ApiSuccessResponseSchema(data), ApiErrorResponseSchema]);

export type ApiResponse<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>;

export const parseApiResponse =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): ApiResponse<T> =>
    ApiResponseSchema(schema).parse(data);

export const isApiResponse =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): data is ApiResponse<T> =>
    ApiResponseSchema(schema).safeParse(data).success;
