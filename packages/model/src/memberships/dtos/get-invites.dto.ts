import { UserSchema } from "@/users";
import z from "zod";
import { InviteSchema } from "../schemas/invite.schema";
import { ProjectSchema } from "@/projects";

export const GetUserInvitesRequestSchema = UserSchema.pick({ id: true });
export type GetUserInvitesRequestDto = z.infer<
  typeof GetUserInvitesRequestSchema
>;

export const GetProjectInvitesRequestSchema = ProjectSchema.pick({ id: true });
export type GetProjectInvitesRequestDto = z.infer<
  typeof GetProjectInvitesRequestSchema
>;

export const GetInvitesResponseSchema = z.array(InviteSchema);
export type GetInvitesResponseDto = z.infer<typeof GetInvitesResponseSchema>;
