import z from 'zod';

import { BaseIdSchema, IsoDateSchema } from '@/shared';
import { UserIdSchema } from '@/users';

export const TokenIdSchema = BaseIdSchema.brand<'TokenId'>();
export type TokenId = z.infer<typeof TokenIdSchema>;

export const parseTokenId = (data: unknown) => TokenIdSchema.parse(data);
export const isTokenId = (data: unknown): data is TokenId => TokenIdSchema.safeParse(data).success;

export const JwtTokenSchema = z.jwt();
export type JwtToken = z.infer<typeof JwtTokenSchema>;

export const parseJwtToken = (data: unknown) => JwtTokenSchema.parse(data);
export const isJwtToken = (data: unknown): data is JwtToken => JwtTokenSchema.safeParse(data).success;

export const TokenUuidSchema = z.uuid();
export type TokenUuid = z.infer<typeof TokenUuidSchema>;

export const parseTokenUuid = (data: unknown) => TokenUuidSchema.parse(data);
export const isTokenUuid = (data: unknown): data is TokenUuid => TokenUuidSchema.safeParse(data).success;

export const TokenTypeSchema = z.enum(['refresh', 'verified']);
export type TokenType = z.infer<typeof TokenTypeSchema>;

export const parseTokenType = (data: unknown) => TokenTypeSchema.parse(data);
export const isTokenType = (data: unknown): data is TokenType => TokenTypeSchema.safeParse(data).success;

export const TokenSchema = z.object({
  id: TokenIdSchema,
  userId: UserIdSchema,
  token: JwtTokenSchema,
  tokenUuid: TokenUuidSchema,
  type: TokenTypeSchema,
  expiresAt: IsoDateSchema,
  isRevoked: z.boolean(),
});

export type Token = z.infer<typeof TokenSchema>;

export const parseToken = (data: unknown) => TokenSchema.parse(data);
export const isToken = (data: unknown): data is Token => TokenSchema.safeParse(data).success;
