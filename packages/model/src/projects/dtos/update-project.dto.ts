import z from "zod";
import { ProjectSchema } from "../schemas/project.schema";

export const UpdateProjectRequestSchema = ProjectSchema.partial({
  canvasJson: true,
  name: true,
}).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  ownerId: true,
});
export type UpdateProjectRequestDto = z.infer<
  typeof UpdateProjectRequestSchema
>;

export const UpdateProjectResponseSchema = ProjectSchema;
export type UpdateProjectResponseDto = z.infer<
  typeof UpdateProjectResponseSchema
>;
