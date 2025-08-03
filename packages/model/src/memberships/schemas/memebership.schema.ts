import z from 'zod';

import { ProjectSchema } from '@/projects';
import { BaseIdSchema, IsoDateSchema } from '@/shared';
import { UserProjectRoleSchema, UserSchema } from '@/users';

export const MembershipIdSchema = BaseIdSchema.brand<'MemebershipId'>();
export type MemebershipId = z.infer<typeof MembershipIdSchema>;

export const MembershipSchema = z.object({
  id: MembershipIdSchema,
  userId: UserSchema.shape.id,
  projectId: ProjectSchema.shape.id,
  role: UserProjectRoleSchema,
  joinedAt: IsoDateSchema,
});

export type Membership = z.infer<typeof MembershipSchema>;
