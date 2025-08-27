import { MembershipSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const CreateMembershipRequestSchema = z.object({
  projectId: MembershipSchema.shape.projectId.min(1, 'Project id is required'),
  userId: MembershipSchema.shape.userId.min(1, 'User id is required'),
  role: MembershipSchema.shape.role, // keep extendable
});
export type CreateMembershipRequestDto = z.infer<typeof CreateMembershipRequestSchema>;
export const parseCreateMembershipRequest = (data: unknown) => CreateMembershipRequestSchema.parse(data);
export const isCreateMembershipRequest = (data: unknown): data is CreateMembershipRequestDto =>
  CreateMembershipRequestSchema.safeParse(data).success;
