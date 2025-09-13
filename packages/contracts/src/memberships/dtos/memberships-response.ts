import { GetAllResSchema, MembershipSchema, ProjectSchema } from '@bc-arch-drafter/model';
import z from 'zod';

import { ApiResponseSchema } from '@/responses';

export const OneMembershipResponseSchema = ApiResponseSchema(MembershipSchema);
export type OneMembershipResponseDto = z.infer<typeof OneMembershipResponseSchema>;
export const parseOneMembershipResponse = (data: unknown) => OneMembershipResponseSchema.parse(data);
export const isOneMembershipResponse = (data: unknown): data is OneMembershipResponseDto =>
  OneMembershipResponseSchema.safeParse(data).success;

export const ManyMembershipResponseSchema = ApiResponseSchema(
  GetAllResSchema(MembershipSchema.extend({ project: ProjectSchema })),
);
export type ManyMembershipResponseDto = z.infer<typeof ManyMembershipResponseSchema>;
export const parseManyMembershipResponse = (data: unknown) => ManyMembershipResponseSchema.parse(data);
export const isManyMembershipResponse = (data: unknown): data is ManyMembershipResponseDto =>
  ManyMembershipResponseSchema.safeParse(data).success;
