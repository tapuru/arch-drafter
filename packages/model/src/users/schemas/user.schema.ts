import z from 'zod';

import { BaseIdSchema } from '@/shared';
import { UserGlobalRoleSchema } from '@/users';

export const UserIdSchema = BaseIdSchema.brand<'UserId'>();
export type UserId = z.infer<typeof UserIdSchema>;

export const UserNameSchema = z
  .string()
  .trim()
  .min(1, { error: 'Name is required' })
  .max(30, { error: 'Max letters is 30' });

export type UserName = z.infer<typeof UserNameSchema>;

export const EmailSchema = z.email({ error: 'Email is invalid' }).trim().min(1, { error: 'Email is required' });
export type Email = z.infer<typeof EmailSchema>;

export const PasswordSchema = z
  .string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, 'Password is invalid');

export type Password = z.infer<typeof PasswordSchema>;

export const UserSchema = z.object({
  id: UserIdSchema,
  name: UserNameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  role: UserGlobalRoleSchema,
});

export type User = z.infer<typeof UserSchema>;
