import { UserSchema } from "@/users";
import z from "zod";

export const ProjectSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3).max(30),
  ownerId: UserSchema.shape.id,
  //TODO: write canvasJson type
  canvasJson: z.json(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
