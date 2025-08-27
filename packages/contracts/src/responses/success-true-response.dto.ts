import z from 'zod';

import { ApiResponseSchema } from '@/responses';

export const SuccessTrueResponseSchema = ApiResponseSchema(
  z.object({
    success: z.literal(true),
  }),
);
export type SuccessTrueResponseDto = z.infer<typeof SuccessTrueResponseSchema>;
export const parseSuccessTrueResponse = (data: unknown) => SuccessTrueResponseSchema.parse(data);
export const isSuccessTrueResponse = (data: unknown): data is SuccessTrueResponseDto =>
  SuccessTrueResponseSchema.safeParse(data).success;
