import z from "zod";
import { MembershipSchema } from "../schemas/memebership.schema";

export const CreateMembershipRequestSchema = MembershipSchema.omit({
  id: true,
  joinedAt: true,
  role: true,
});
export type CreateMembershipRequestDto = z.infer<
  typeof CreateMembershipRequestSchema
>;

export const CreateMembershipResponseSchema = MembershipSchema;
export type CreateMembershipResponseDto = z.infer<
  typeof CreateMembershipResponseSchema
>;
