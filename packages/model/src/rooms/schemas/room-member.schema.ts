import z from 'zod';

import { UserProjectRoleSchema } from '@/memberships';
import { BaseIdSchema } from '@/shared';
import { UserSchema } from '@/users';

export const RoomMemberSchema = z.object({
  id: BaseIdSchema,
  userId: UserSchema.shape.id,
  role: UserProjectRoleSchema,
  cursor: z.object({
    x: z.number(),
    y: z.number(),
  }),
});
export type RoomMember = z.infer<typeof RoomMemberSchema>;

export const parseRoomMember = (data: unknown) => RoomMemberSchema.parse(data);
export const isRoomMember = (data: unknown): data is RoomMember => RoomMemberSchema.safeParse(data).success;
