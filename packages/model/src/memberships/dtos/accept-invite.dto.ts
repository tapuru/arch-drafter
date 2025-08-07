import z from "zod";
import { InviteSchema } from "../schemas/invite.schema";

export const AcceptInviteRequestSchema = InviteSchema.pick({
  id: true,
  userId: true,
});

export type AcceptInviteRequestDto = z.infer<typeof AcceptInviteRequestSchema>;

export const AcceptInviteResponseSchema = z.void();
export type AcceptInviteResponseDto = z.infer<
  typeof AcceptInviteResponseSchema
>;
