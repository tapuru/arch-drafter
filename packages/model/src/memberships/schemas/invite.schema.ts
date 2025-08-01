import z from 'zod';

import { ProjectSchema } from '@/projects';
import { AppIdSchema, IsoDateSchema, NullableIsoDateSchema } from '@/shared';
import { UserSchema } from '@/users';

export const InviteSchema = z.object({
  id: AppIdSchema,
  projectId: ProjectSchema.shape.id,
  senderId: UserSchema.shape.id,
  userId: UserSchema.shape.id,
  sentAt: IsoDateSchema,
  acceptedAt: NullableIsoDateSchema,
  rejectedAt: NullableIsoDateSchema,
});

export type Invite = z.infer<typeof InviteSchema>;
