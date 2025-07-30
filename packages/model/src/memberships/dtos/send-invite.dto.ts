import z from "zod";
import { InviteSchema } from "../schemas/invite.schema";

export const SendInviteRequestSchema = InviteSchema.omit({
  id: true,
  acceptedAt: true,
  sentAt: true,
  rejectedAt: true,
});

export type SendInviteRequestDto = z.infer<typeof SendInviteRequestSchema>;

export const SendInviteResponseSchema = z.void();
export type SendInviteResponseDto = z.infer<typeof SendInviteResponseSchema>;
