import z from 'zod';

import { ProjectSchema } from '@/projects';
import { BaseIdSchema, IsoDateSchema, NullableIsoDateSchema } from '@/shared';
import { UserSchema } from '@/users';

export const InviteIdSchema = BaseIdSchema.brand<'InviteId'>();
export type InviteId = z.infer<typeof InviteIdSchema>;

export const InviteSchema = z.object({
  id: InviteIdSchema,
  projectId: ProjectSchema.shape.id,
  senderId: UserSchema.shape.id,
  userId: UserSchema.shape.id,
  sentAt: IsoDateSchema,
  acceptedAt: NullableIsoDateSchema,
  rejectedAt: NullableIsoDateSchema,
});

export type Invite = z.infer<typeof InviteSchema>;
