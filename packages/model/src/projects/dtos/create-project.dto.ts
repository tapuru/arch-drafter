import z from "zod";
import { ProjectSchema } from "../schemas/project.schema";

export const CreateProjectRequestSchema = ProjectSchema.omit({
  createdAt: true,
  updatedAt: true,
  id: true,
  canvasJson: true,
});
export type CreateProjectRequestDto = z.infer<
  typeof CreateProjectRequestSchema
>;

export const CreateProjectResponseSchema = ProjectSchema.omit({
  canvasJson: true,
});
export type CreateProjectResponseDto = z.infer<
  typeof CreateProjectResponseSchema
>;
