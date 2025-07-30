import z from "zod";
import { InviteSchema } from "../schemas/invite.schema";

export const CancelInviteRequestSchema = InviteSchema.pick({
  id: true,
  userId: true,
  senderId: true,
});
export type CancelInviteRequestDto = z.infer<typeof CancelInviteRequestSchema>;

export const CancelInviteResponseSchema = z.void();
export type CancelInviteResponseDto = z.infer<
  typeof CancelInviteResponseSchema
>;
