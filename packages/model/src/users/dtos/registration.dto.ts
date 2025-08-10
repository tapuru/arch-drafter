import z from 'zod';

import { JwtTokenSchema } from '@/users';
import { UserNameSchema, EmailSchema, PasswordSchema } from '@/users';

export const RegistrationRequestSchema = z
  .object({
    name: UserNameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    passwordRepeat: PasswordSchema,
  })
  .refine((data) => {
    return data.password === data.passwordRepeat;
  });

export type RegistrationRequestDto = z.infer<typeof RegistrationRequestSchema>;

export const RegistrationResponseSchema = z.object({
  accessToken: JwtTokenSchema,
});

export type RegistrationResponseDto = z.infer<typeof RegistrationResponseSchema>;
