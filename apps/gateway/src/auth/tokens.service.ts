import { ConfigService } from '@bc-arch-drafter/api-config';
import { AppHttpException, ms } from '@bc-arch-drafter/lib';
import { TokenUuid, UserId, JwtToken, Token, StringValue, TokensService } from '@bc-arch-drafter/model';
import { TokensRepository } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { SignJWT, jwtVerify } from 'jose';
import { createSecretKey, randomUUID } from 'node:crypto';

import { ENCRYPTION_ALG } from '@/auth/constants/encryption';

@Injectable()
export class TokensServiceImpl implements TokensService {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokensRepository: TokensRepository,
  ) {}

  private async getSecretKey(encoding = ENCRYPTION_ALG.BASE64URL) {
    const tokenSecret = this.configService.get().services['USERS_SERVICE'].payload?.TOKEN_SECRET;
    if (!tokenSecret) throw new AppHttpException('Token secret invalid', HttpStatus.BAD_REQUEST);

    return createSecretKey(tokenSecret, encoding);
  }

  public async getAccessToken(userId: UserId, refreshTokenUuid: TokenUuid) {
    const key = await this.getSecretKey();
    const accessTokenTtl = this.configService.get().services['USERS_SERVICE'].payload?.TOKEN_ACCESS_TTL;
    if (!accessTokenTtl) throw new AppHttpException('Token ttl invalid', HttpStatus.BAD_REQUEST);

    const accessToken = await new SignJWT({ userId })
      .setProtectedHeader({ alg: ENCRYPTION_ALG.HS256 })
      .setJti(refreshTokenUuid)
      .setIssuedAt()
      .setExpirationTime(accessTokenTtl)
      .sign(key);

    return { accessToken };
  }

  public async getRefreshToken(userId: UserId) {
    const key = await this.getSecretKey();
    const refreshTokenTtl = this.configService.get().services['USERS_SERVICE'].payload?.TOKEN_REFRESH_TTL;
    if (!refreshTokenTtl) throw new AppHttpException('Token ttl invalid', HttpStatus.BAD_REQUEST);

    const refreshTokenUuid = randomUUID();

    const refreshToken = await new SignJWT({ userId })
      .setProtectedHeader({ alg: ENCRYPTION_ALG.HS256 })
      .setJti(refreshTokenUuid)
      .setIssuedAt()
      .setExpirationTime(refreshTokenTtl)
      .sign(key);

    return { refreshToken, refreshTokenUuid, refreshTokenTtl: ms(refreshTokenTtl as StringValue) };
  }

  // todo generated token for email notifications or other services
  //
  // public getVerifyToken() {
  //   const verifierTokenTtl = this.configService.get().services['USERS_SERVICE'].payload?.TOKEN_VERIFY_TTL;
  //   const verifierToken = randomBytes(ENCRYPTION_ALG.LENGTH64).toString(ENCRYPTION_ALG.BASE64URL);
  //   const verifierTokenUuid = randomUUID();
  //
  //   return { verifierToken, verifierTokenUuid, verifierTtl: ms(verifierTokenTtl as StringValue) };
  // }

  public async verifyAccessToken(token: JwtToken) {
    const key = await this.getSecretKey();

    try {
      const { payload } = await jwtVerify(token, key, { clockTolerance: '5s' });
      if (!payload?.userId || !payload?.jti)
        throw new AppHttpException('Token payload invalid', HttpStatus.BAD_REQUEST);

      const refreshTokenRow = await this.tokensRepository.findByUuid(payload.jti);
      if (!refreshTokenRow) throw new AppHttpException('Refresh token not found', HttpStatus.NOT_FOUND);

      return { userId: payload.userId as UserId, refreshUuid: payload.jti as TokenUuid };
    } catch {
      throw new AppHttpException('Access token invalid', HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyRefreshToken(token: JwtToken) {
    const key = await this.getSecretKey();

    try {
      const { payload } = await jwtVerify(token, key, { clockTolerance: '5s' });
      if (!payload.userId || !payload.jti) throw new AppHttpException('Token payload invalid', HttpStatus.BAD_REQUEST);

      return await this.verifyToken(token, payload.jti);
    } catch {
      throw new AppHttpException('Refresh token invalid', HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyToken(token: JwtToken, tokenUuid: TokenUuid, isExpires?: boolean) {
    const tokenRow = await this.tokensRepository.findByUuid(tokenUuid);

    if (!tokenRow) throw new AppHttpException('Token not found', HttpStatus.NOT_FOUND);
    if (!(await argon2.verify(tokenRow.token, token)))
      throw new AppHttpException('Token not verified', HttpStatus.BAD_REQUEST);
    if (isExpires && new Date(tokenRow.expiresAt).getTime() < Date.now())
      throw new AppHttpException('Token expired', HttpStatus.BAD_REQUEST);

    return { tokenRow };
  }

  public async saveToken(tokenData: Omit<Token, 'id' | 'isRevoked'>) {
    const { userId, token, type, tokenUuid, expiresAt } = tokenData;
    const tokenHash = await argon2.hash(token);
    const tokenExpires = new Date(Date.now() + +expiresAt).toISOString();

    await this.tokensRepository.saveToken({
      userId,
      token: tokenHash,
      type,
      tokenUuid,
      expiresAt: tokenExpires,
    });
  }
}
