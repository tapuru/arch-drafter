import { UserIdSchema } from '@bc-arch-drafter/model';
import z from 'zod';

export const DeleteUserByIdRequestSchema = z.object({ id: UserIdSchema });

export type DeleteUserByIdRequestDto = z.infer<typeof DeleteUserByIdRequestSchema>;

export type DeleteUserByIdResponseDto = { message: string };
