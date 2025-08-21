import { JwtTokenSchema, EmailSchema, PasswordSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const LoginRequestSchema = z.object({
  password: PasswordSchema,
  email: EmailSchema,
});

export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  accessToken: JwtTokenSchema,
});

export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;
