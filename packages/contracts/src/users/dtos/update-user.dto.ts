import { UserSchema, PasswordSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const UpdateUserByIdResponseSchema = z.object({
  id: UserSchema.shape.id,
  name: UserSchema.shape.name,
});

export type UpdateUserResponseDto = z.infer<typeof UpdateUserByIdResponseSchema>;

export const parseUpdateUser = (data: unknown) => UpdateUserByIdResponseSchema.parse(data);

export const UpdateUserRequestSchema = z.object({
  id: UserSchema.shape.id,
  data: z.object({
    name: UserSchema.shape.name.optional(),
    password: PasswordSchema.optional(),
  }),
});

export type UpdateUserRequestDto = z.infer<typeof UpdateUserRequestSchema>;
