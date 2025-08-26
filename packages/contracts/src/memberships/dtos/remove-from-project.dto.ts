import { MembershipSchema, UserIdSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const RemoveFromProjectRequestSchema = z.object({
  projectId: MembershipSchema.shape.projectId.min(1, 'Project id is required'),
  userId: MembershipSchema.shape.userId.min(1, 'User id is required'),
  removerId: UserIdSchema.min(1, 'Remover id is required'),
});
export type RemoveFromProjectRequestDto = z.infer<typeof RemoveFromProjectRequestSchema>;
export const parseRemoveFromProjectRequest = (data: unknown) => RemoveFromProjectRequestSchema.parse(data);
export const isRemoveFromProjectRequest = (data: unknown): data is RemoveFromProjectRequestDto =>
  RemoveFromProjectRequestSchema.safeParse(data).success;
