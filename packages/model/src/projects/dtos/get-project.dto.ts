import z from "zod";
import { ProjectSchema } from "../schemas/project.schema";

export const GetProjectByIdRequestSchema = z.object({
  id: ProjectSchema.shape.id,
});
export type GetProjectByIdRequestDto = z.infer<
  typeof GetProjectByIdRequestSchema
>;

export const GetProjectByIdResponseSchema = ProjectSchema;
export type GetProjectByIdResponseDto = z.infer<
  typeof GetProjectByIdResponseSchema
>;
