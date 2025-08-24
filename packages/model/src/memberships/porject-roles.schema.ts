import z from 'zod';

export const UserProjectRoleSchema = z.enum(['owner', 'member', 'viewer']);
export type UserProjectRole = z.infer<typeof UserProjectRoleSchema>;

export const parseUserProjectRoleSchema = (data: unknown) => UserProjectRoleSchema.parse(data);
export const isUserProjectRoleSchema = (data: unknown): data is UserProjectRole =>
  UserProjectRoleSchema.safeParse(data).success;
