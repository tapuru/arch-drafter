import { ProjectIdSchema, UserIdSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const GetUserInvitesRequestSchema = z.object({
  id: UserIdSchema,
});
export type GetUserInvitesRequestDto = z.infer<typeof GetUserInvitesRequestSchema>;
export const parseGetUserInvitesRequest = (data: unknown): GetUserInvitesRequestDto =>
  GetUserInvitesRequestSchema.parse(data);
export const isGetUserInvitesRequest = (data: unknown): data is GetUserInvitesRequestDto =>
  GetUserInvitesRequestSchema.safeParse(data).success;

export const GetProjectInvitesRequestSchema = z.object({
  id: ProjectIdSchema,
});
export type GetProjectInvitesRequestDto = z.infer<typeof GetProjectInvitesRequestSchema>;
export const parseGetProjectInvitesRequest = (data: unknown): GetProjectInvitesRequestDto =>
  GetProjectInvitesRequestSchema.parse(data);
export const isGetProjectInvitesRequest = (data: unknown): data is GetProjectInvitesRequestDto =>
  GetProjectInvitesRequestSchema.safeParse(data).success;
