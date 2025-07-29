import z from "zod";
import { UserSchema } from "../schemas/user.schema";
import { JwtTokenSchema } from "../schemas/jwt.schema";

export const PasswordSchema = z.string().min(6).max(30);

export const LoginRequestSchema = z.object({
  password: PasswordSchema,
  email: UserSchema.shape.email,
});
export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  accessToken: JwtTokenSchema,
});
export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;
