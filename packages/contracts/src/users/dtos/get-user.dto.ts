import { UserSchema, UserIdSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const GetUserByIdResponseSchema = UserSchema.extend({});

export type GetUserByIdResponseDto = z.infer<typeof GetUserByIdResponseSchema>;
export const parseGetUserByIdResponse = (data: unknown) => GetUserByIdResponseSchema.parse(data);

export const GetUserByIdRequestSchema = z.object({ id: UserIdSchema });

export type GetUserByIdRequestDto = z.infer<typeof GetUserByIdRequestSchema>;
