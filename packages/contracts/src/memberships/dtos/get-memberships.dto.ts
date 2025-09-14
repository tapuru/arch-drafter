import { MembershipSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const GetUserMembershipsRequestSchema = z.object({
  userId: MembershipSchema.shape.userId,
});
export type GetUserMembershipsRequestDto = z.infer<typeof GetUserMembershipsRequestSchema>;
export const parseGetUserMembershipsRequest = (data: unknown) => GetUserMembershipsRequestSchema.parse(data);
export const isGetUserMembershipsRequest = (data: unknown): data is GetUserMembershipsRequestDto =>
  GetUserMembershipsRequestSchema.safeParse(data).success;
