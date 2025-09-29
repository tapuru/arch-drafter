import { JwtToken, Token, TokenUuid } from '@/tokens';
import { UserId } from '@/users';

export type SaveToken = (tokenData: Omit<Token, 'id' | 'isRevoked'>) => Promise<void>;

export type GetAccessToken = (userId: UserId, tokenUuid: TokenUuid) => Promise<{ accessToken: JwtToken }>;
export type GetRefreshToken = (
  userId: UserId,
) => Promise<{ refreshToken: JwtToken; refreshTokenUuid: TokenUuid; refreshTokenTtl: number }>;

export type VerifyAccessToken = (token: JwtToken) => Promise<{ userId: UserId; refreshUuid: TokenUuid }>;
export type VerifyRefreshToken = (token: JwtToken) => Promise<{ tokenRow: Token }>;
export type VerifyToken = (token: JwtToken, tokenUuid: TokenUuid, isExpires?: boolean) => Promise<{ tokenRow: Token }>;

export interface TokensService {
  getAccessToken: GetAccessToken;
  getRefreshToken: GetRefreshToken;
  verifyAccessToken: VerifyAccessToken;
  verifyRefreshToken: VerifyRefreshToken;
  verifyToken: VerifyToken;
  saveToken: SaveToken;
}
