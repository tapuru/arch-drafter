import { MembershipSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const LeaveProjectRequestSchema = z.object({
  projectId: MembershipSchema.shape.projectId.min(1, 'Project id is required'),
  userId: MembershipSchema.shape.userId.min(1, 'User id is required'),
});
export type LeaveProjectRequestDto = z.infer<typeof LeaveProjectRequestSchema>;
export const parseLeaveProjectRequest = (data: unknown) => LeaveProjectRequestSchema.parse(data);
export const isLeaveProjectRequest = (data: unknown): data is LeaveProjectRequestDto =>
  LeaveProjectRequestSchema.safeParse(data).success;
