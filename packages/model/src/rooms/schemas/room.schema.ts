import z from 'zod';

import { CanvasJsonSchema, ProjectSchema } from '@/projects';
import { BaseIdSchema } from '@/shared';

import { RoomMemberSchema } from './room-member.schema';

export const RoomIdSchema = BaseIdSchema.brand<'RoomId'>();
export type RoomId = z.infer<typeof RoomIdSchema>;

export const parseRoomId = (data: unknown) => RoomIdSchema.parse(data);
export const isRoomId = (data: unknown): data is RoomId => RoomIdSchema.safeParse(data).success;

export const RoomSchema = z.object({
  id: RoomIdSchema,
  projectId: ProjectSchema.shape.id,
  members: z.array(RoomMemberSchema),
  canvas: CanvasJsonSchema,
});
export type Room = z.infer<typeof RoomSchema>;

export const parseRoom = (data: unknown) => RoomSchema.parse(data);
export const isRoom = (data: unknown): data is Room => RoomSchema.safeParse(data).success;
