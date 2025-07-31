import z from "zod";
import { UserGlobalRoleSchema } from "./roles.schema";

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "min 1").max(30, "max 30"),
  email: z.email(),
  role: UserGlobalRoleSchema,
});

export type User = z.infer<typeof UserSchema>;
