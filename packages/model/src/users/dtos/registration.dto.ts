import z from "zod";
import { PasswordSchema } from "./login.dto";
import { UserSchema } from "../schemas/user.schema";
import { JwtTokenSchema } from "../schemas/jwt.schema";

export const RegistrationRequestSchema = z
  .object({
    password: PasswordSchema,
    passwordRepeat: PasswordSchema,
    email: UserSchema.shape.email,
    name: UserSchema.shape.name,
  })
  .refine((data) => {
    return data.password === data.passwordRepeat;
  });
export type RegistrationRequestDto = z.infer<typeof RegistrationRequestSchema>;

export const RegistrationResponseSchema = z.object({
  accessToken: JwtTokenSchema,
});
export type RegistrationResponseDto = z.infer<
  typeof RegistrationResponseSchema
>;
