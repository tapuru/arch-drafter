import z from 'zod';

import { ApiErrorSchema } from './api-error.schema';

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  errors: z.array(ApiErrorSchema),
  status: z.number().optional(),
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
export const parseApiErrorResponse = (data: unknown): ApiErrorResponse => ApiErrorResponseSchema.parse(data);

export const isApiErrorResponse = (data: unknown): data is ApiErrorResponse =>
  ApiErrorResponseSchema.safeParse(data).success;
