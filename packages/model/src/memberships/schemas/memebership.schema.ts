import { ProjectSchema } from "@/projects";
import { UserProjectRoleSchema, UserSchema } from "@/users";
import z from "zod";

export const MembershipSchema = z.object({
  id: z.uuid(),
  userId: UserSchema.shape.id,
  projectId: ProjectSchema.shape.id,
  role: UserProjectRoleSchema,
  joinedAt: z.iso.datetime(),
});

export type Membership = z.infer<typeof MembershipSchema>;
