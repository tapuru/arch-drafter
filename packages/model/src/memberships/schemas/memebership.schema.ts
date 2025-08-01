import z from 'zod';

import { ProjectSchema } from '@/projects';
import { AppIdSchema, IsoDateSchema } from '@/shared';
import { UserProjectRoleSchema, UserSchema } from '@/users';

export const MembershipSchema = z.object({
  id: AppIdSchema,
  userId: UserSchema.shape.id,
  projectId: ProjectSchema.shape.id,
  role: UserProjectRoleSchema,
  joinedAt: IsoDateSchema,
});

export type Membership = z.infer<typeof MembershipSchema>;
