import { JwtTokenSchema, UserNameSchema, EmailSchema, PasswordSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const RegistrationRequestSchema = z
  .object({
    name: UserNameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    passwordRepeat: PasswordSchema,
  })
  .refine((data) => data.passwordRepeat === data.password, { message: 'Passwords do not match' });

export type RegistrationRequestDto = z.infer<typeof RegistrationRequestSchema>;

export const RegistrationResponseSchema = z.object({
  accessToken: JwtTokenSchema,
});

export type RegistrationResponseDto = z.infer<typeof RegistrationResponseSchema>;
