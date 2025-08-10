import z from 'zod';

import { BaseIdSchema } from '@/shared';

export const TokenIdSchema = BaseIdSchema.brand<'TokenId'>();
export type TokenId = z.infer<typeof TokenIdSchema>;

export const JwtTokenSchema = z.jwt();
export type JwtToken = z.infer<typeof JwtTokenSchema>;

export const TokenTypeSchema = z.enum(['refresh', 'verified']);
export type TokenType = z.infer<typeof TokenTypeSchema>;
