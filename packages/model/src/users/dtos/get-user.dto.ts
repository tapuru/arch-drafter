import z from "zod";
import { UserSchema } from "../schemas/user.schema";

export const GetUserByIdResponseSchema = UserSchema.extend({});
export type GetUserByIdDto = z.infer<typeof GetUserByIdResponseSchema>;
