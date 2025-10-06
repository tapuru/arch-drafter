import { CanvasJsonSchema } from '@bc-arch-drafter/model';
import z from 'zod';

import { ApiSuccessResponseSchema } from '@/responses';

export const CanvasResponseSchema = ApiSuccessResponseSchema(CanvasJsonSchema);
export type CanvasResponseDto = z.infer<typeof CanvasResponseSchema>;
export const parseCanvasResponse = (data: unknown) => CanvasResponseSchema.parse(data);
export const isCanvasResponse = (data: unknown): data is CanvasResponseDto =>
  CanvasResponseSchema.safeParse(data).success;
