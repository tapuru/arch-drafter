import { ProjectSchema } from "@/projects";
import { UserSchema } from "@/users";
import z from "zod";

export const LeaveProjectRequestSchema = z.object({
  userId: UserSchema.shape.id,
  projectId: ProjectSchema.shape.id,
});
export type LeaveProjectRequestDto = z.infer<typeof LeaveProjectRequestSchema>;

export const LeaveProjectResponseSchema = z.void();
export type LeaveProjectResponseDto = z.infer<
  typeof LeaveProjectResponseSchema
>;
