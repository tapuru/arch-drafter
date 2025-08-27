import { InviteSchema, UserIdSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const CancelInviteRequestSchema = z.object({
  id: InviteSchema.shape.id.min(1, 'Invite id is required'),
  cancelerId: UserIdSchema.min(1, 'Canceler id is required'),
});
export type CancelInviteRequestDto = z.infer<typeof CancelInviteRequestSchema>;
export const parseCancelInviteRequest = (data: unknown): CancelInviteRequestDto =>
  CancelInviteRequestSchema.parse(data);
export const isCancelInviteRequest = (data: unknown): data is CancelInviteRequestDto =>
  CancelInviteRequestSchema.safeParse(data).success;
