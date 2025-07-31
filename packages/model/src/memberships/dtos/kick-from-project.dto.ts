import { ProjectSchema } from "@/projects";
import { UserSchema } from "@/users";
import z from "zod";

export const KickFromProjectRequestSchema = z.object({
  projectId: ProjectSchema.shape.id,
  userId: UserSchema.shape.id,
  //TODO: figure out better name for this
  kickerId: UserSchema.shape.id,
});
export type KickFromProjectRequestDto = z.infer<
  typeof KickFromProjectRequestSchema
>;

export const KickFromProjectResponseSchema = z.void();
export type KickFromProjectResponseDto = z.infer<
  typeof KickFromProjectResponseSchema
>;
