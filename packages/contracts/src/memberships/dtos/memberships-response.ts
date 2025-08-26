import { MembershipSchema } from '@bc-arch-drafter/model';
import z from 'zod';

import { ApiResponseSchema } from '@/responses';

export const OneMembershipResponseSchema = ApiResponseSchema(MembershipSchema);
export type OneMembershipResponseDto = z.infer<typeof OneMembershipResponseSchema>;
export const parseOneMembershipResponse = (data: unknown) => OneMembershipResponseSchema.parse(data);
export const isOneMembershipResponse = (data: unknown): data is OneMembershipResponseDto =>
  OneMembershipResponseSchema.safeParse(data).success;
