import z from "zod";
import { InviteSchema } from "../schemas/invite.schema";

export const RejectInviteRequestSchema = InviteSchema.pick({
  id: true,
  userId: true,
});
export type RejectInviteRequestDto = z.infer<typeof RejectInviteRequestSchema>;

export const RejectInviteResponseSchema = z.void();
export type RejectInviteResponseDto = z.infer<
  typeof RejectInviteResponseSchema
>;
