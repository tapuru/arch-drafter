import { JwtTokenSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const UpdateTokenResponseSchema = z.object({
  accessToken: JwtTokenSchema,
});

export type UpdateTokenResponseDto = z.infer<typeof UpdateTokenResponseSchema>;
