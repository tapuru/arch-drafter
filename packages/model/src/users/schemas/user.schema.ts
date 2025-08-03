import z from 'zod';

import { BaseIdSchema } from '@/shared';

import { UserGlobalRoleSchema } from './roles.schema';

export const UserIdSchema = BaseIdSchema.brand<'UserId'>();
export type UserId = z.infer<typeof UserIdSchema>;

export const UserNameSchema = z.string().min(1).max(30);
export type UserName = z.infer<typeof UserNameSchema>;

export const EmailSchema = z.email();
export type Email = z.infer<typeof EmailSchema>;

export const UserSchema = z.object({
  id: UserIdSchema,
  name: UserNameSchema,
  email: EmailSchema,
  role: UserGlobalRoleSchema,
});

export type User = z.infer<typeof UserSchema>;
