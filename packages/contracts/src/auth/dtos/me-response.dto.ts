import { UserSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const MeResponseSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
  role: true,
});

export type MeResponseDto = z.infer<typeof MeResponseSchema>;
export const parseMeResponse = (data: unknown) => MeResponseSchema.parse(data);
