import z from 'zod';

export const UserGlobalRoleSchema = z.enum(['admin', 'user']);
export type UserGlobalRole = z.infer<typeof UserGlobalRoleSchema>;

export const parseUserGlobalRole = (data: unknown) => UserGlobalRoleSchema.parse(data);
export const isUserGlobalRole = (data: unknown): data is UserGlobalRole => UserGlobalRoleSchema.safeParse(data).success;

export const UserProjectRoleSchema = z.enum(['owner', 'member', 'viewer']);
export type UserProjectRole = z.infer<typeof UserProjectRoleSchema>;

export const parseUserProjectRoleSchema = (data: unknown) => UserProjectRoleSchema.parse(data);
export const isUserProjectRoleSchema = (data: unknown): data is UserProjectRole =>
  UserProjectRoleSchema.safeParse(data).success;
