import z from 'zod';

import { ProjectSchema } from '@/projects';
import { BaseIdSchema, IsoDateSchema } from '@/shared';
import { UserProjectRoleSchema, UserSchema } from '@/users';

export const MembershipIdSchema = BaseIdSchema.brand<'MemebershipId'>();
export type MemebershipId = z.infer<typeof MembershipIdSchema>;
export const parseMembershipId = (data: unknown) => MembershipIdSchema.parse(data);
export const isMembershipId = (data: unknown): data is MemebershipId => MembershipIdSchema.safeParse(data).success;

export const MembershipSchema = z.object({
  id: MembershipIdSchema,
  userId: UserSchema.shape.id,
  projectId: ProjectSchema.shape.id,
  role: UserProjectRoleSchema,
  joinedAt: IsoDateSchema,
});
export type Membership = z.infer<typeof MembershipSchema>;
export const parseMembership = (data: unknown) => MembershipSchema.parse(data);
export const isMembership = (data: unknown): data is Membership => MembershipSchema.safeParse(data).success;
