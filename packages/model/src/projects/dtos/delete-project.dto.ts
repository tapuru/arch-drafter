import z from "zod";
import { ProjectSchema } from "../schemas/project.schema";

export const DeleteProjectRequestSchema = z.object({
  id: ProjectSchema.shape.id,
});
export type DeleteProjectRequestDto = z.infer<
  typeof DeleteProjectRequestSchema
>;

export const DeleteProjectResponseSchema = z.void();
export type DeleteProjectResponseDto = z.infer<
  typeof DeleteProjectResponseSchema
>;
