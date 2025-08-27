import { InviteSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const AcceptInviteRequestSchema = z.object({
  id: InviteSchema.shape.id.min(1, 'Invite id is required'),
  userId: InviteSchema.shape.userId.min(1, 'User id is required'),
});
export type AcceptInviteRequestDto = z.infer<typeof AcceptInviteRequestSchema>;
export const parseAcceptInviteRequest = (data: unknown): AcceptInviteRequestDto =>
  AcceptInviteRequestSchema.parse(data);
export const isAcceptInviteRequest = (data: unknown): data is AcceptInviteRequestDto =>
  AcceptInviteRequestSchema.safeParse(data).success;

export const RejectInviteRequestSchema = AcceptInviteRequestSchema;
export type RejectInviteRequestDto = z.infer<typeof RejectInviteRequestSchema>;
export const parseRejectInviteRequest = (data: unknown): RejectInviteRequestDto =>
  RejectInviteRequestSchema.parse(data);
export const isRejectInviteRequest = (data: unknown): data is RejectInviteRequestDto =>
  RejectInviteRequestSchema.safeParse(data).success;
