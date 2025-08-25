import { InviteSchema, UserProjectRoleSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const SendInviteRequestSchema = z.object({
  userId: InviteSchema.shape.userId.min(1, 'User id is required'),
  projectId: InviteSchema.shape.projectId.min(1, 'Project id is required'),
  senderId: InviteSchema.shape.senderId.min(1, 'Sender id is required'),
  role: UserProjectRoleSchema,
});
export type SendInviteRequestDto = z.infer<typeof SendInviteRequestSchema>;
export const parseSendInviteRequest = (data: unknown): SendInviteRequestDto => SendInviteRequestSchema.parse(data);
export const isSendInviteRequest = (data: unknown): data is SendInviteRequestDto =>
  SendInviteRequestSchema.safeParse(data).success;
