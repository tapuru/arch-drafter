import z from "zod";

export const UserGlobalRoleSchema = z.enum(["admin", "user"]);
export type UserGlobalRole = z.infer<typeof UserGlobalRoleSchema>;

export const UserProjectRoleSchema = z.enum(["owner", "member", "viewer"]);
export type UserProjectRole = z.infer<typeof UserProjectRoleSchema>;
