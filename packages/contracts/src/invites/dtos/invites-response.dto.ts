import { GetAllResSchema, InviteSchema } from '@bc-arch-drafter/model';
import z from 'zod';

import { ApiResponseSchema } from '@/responses';

export const ManyInvitesResponseSchema = ApiResponseSchema(
  GetAllResSchema(
    InviteSchema.omit({
      canceledAt: true,
    }),
  ),
);
export type ManyInvitesResponseDto = z.infer<typeof ManyInvitesResponseSchema>;
export const parseManyInvitesResponse = (data: unknown): ManyInvitesResponseDto =>
  ManyInvitesResponseSchema.parse(data);
export const isManyInvitesResponse = (data: unknown): data is ManyInvitesResponseDto =>
  ManyInvitesResponseSchema.safeParse(data).success;

export const OneInviteResponseSchema = ApiResponseSchema(InviteSchema.omit({ canceledAt: true }));
export type OneInviteResponseDto = z.infer<typeof OneInviteResponseSchema>;
export const parseOneIviteResponse = (data: unknown): OneInviteResponseDto => OneInviteResponseSchema.parse(data);
export const isOneInvitesResponse = (data: unknown): data is OneInviteResponseDto =>
  OneInviteResponseSchema.safeParse(data).success;
