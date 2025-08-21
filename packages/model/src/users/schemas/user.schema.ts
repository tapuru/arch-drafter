import z from 'zod';

import { BaseIdSchema } from '@/shared';
import { UserGlobalRoleSchema } from '@/users';

export const UserIdSchema = BaseIdSchema.brand<'UserId'>();
export type UserId = z.infer<typeof UserIdSchema>;

export const parseUserId = (data: unknown) => UserIdSchema.parse(data);
export const isUseId = (data: unknown): data is UserId => UserIdSchema.safeParse(data).success;

export const UserNameSchema = z
  .string()
  .trim()
  .min(1, { error: 'Name is required' })
  .max(30, { error: 'Max letters is 30' });

export type UserName = z.infer<typeof UserNameSchema>;

export const parseUserName = (data: unknown) => UserNameSchema.parse(data);
export const isUserName = (data: unknown): data is UserName => UserNameSchema.safeParse(data).success;

export const EmailSchema = z.email({ error: 'Email is invalid' }).trim().min(1, { error: 'Email is required' });
export type Email = z.infer<typeof EmailSchema>;

export const parseEmail = (data: unknown) => EmailSchema.parse(data);
export const isEmail = (data: unknown): data is Email => EmailSchema.safeParse(data).success;

export const UserSchema = z.object({
  id: UserIdSchema,
  name: UserNameSchema,
  email: EmailSchema,
  role: UserGlobalRoleSchema,
});

export type User = z.infer<typeof UserSchema>;

export const parseUser = (data: unknown) => UserSchema.parse(data);
export const isUser = (data: unknown): data is User => UserSchema.safeParse(data).success;
