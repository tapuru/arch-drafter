import { ProjectSchema } from "@/projects";
import { UserSchema } from "@/users";
import z from "zod";

export const InviteSchema = z.object({
  id: z.uuid(),
  projectId: ProjectSchema.shape.id,
  senderId: UserSchema.shape.id,
  userId: UserSchema.shape.id,
  sentAt: z.iso.datetime(),
  acceptedAt: z.iso.datetime().nullable(),
  rejectedAt: z.iso.datetime().nullable(),
});

export type Invite = z.infer<typeof InviteSchema>;
