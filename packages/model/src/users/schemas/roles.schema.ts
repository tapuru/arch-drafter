import z from 'zod';

export const UserGlobalRoleSchema = z.enum(['admin', 'user']);
export type UserGlobalRole = z.infer<typeof UserGlobalRoleSchema>;

export const parseUserGlobalRole = (data: unknown) => UserGlobalRoleSchema.parse(data);
export const isUserGlobalRole = (data: unknown): data is UserGlobalRole => UserGlobalRoleSchema.safeParse(data).success;
