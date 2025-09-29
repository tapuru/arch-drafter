import { LoginRequestDto, RegistrationRequestDto } from '@bc-arch-drafter/contracts';
import { AppHttpException } from '@bc-arch-drafter/lib';
import { AuthService, TokenUuid, UserId } from '@bc-arch-drafter/model';
import { TokensRepository, UsersRepository } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { TokensServiceImpl } from '@/auth/tokens.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokensRepository: TokensRepository,
    private readonly tokensService: TokensServiceImpl,
  ) {}

  private async getAuthToken(userId: UserId) {
    const { refreshToken, refreshTokenUuid, refreshTokenTtl } = await this.tokensService.getRefreshToken(userId);
    const { accessToken } = await this.tokensService.getAccessToken(userId, refreshTokenUuid);

    const foundTokenRow = await this.tokensRepository.findByUserIdAndTokenType(userId, 'refresh');
    if (foundTokenRow) await this.tokensRepository.deleteToken(foundTokenRow.tokenUuid);

    await this.tokensService.saveToken({
      userId,
      token: refreshToken,
      type: 'refresh',
      tokenUuid: refreshTokenUuid,
      expiresAt: String(refreshTokenTtl),
    });

    return { accessToken, refreshToken, refreshTokenTtl };
  }

  public async register(data: RegistrationRequestDto) {
    const { name, email, password } = data;

    const user = await this.usersRepository.findByEmail(email);
    if (user) throw new AppHttpException([{ field: 'email', message: 'User already exists' }], HttpStatus.BAD_REQUEST);

    const passwordHash = await argon2.hash(password);
    const newUser = await this.usersRepository.createUser(name, email, passwordHash);

    return this.getAuthToken(newUser.id as UserId);
  }

  public async login(data: LoginRequestDto) {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppHttpException([{ field: 'email', message: 'User is not exists' }], HttpStatus.NOT_FOUND);
    if (user.isBanned) throw new AppHttpException('User is banned', HttpStatus.FORBIDDEN);
    if (!user.isVerified) throw new AppHttpException('Email is not verified', HttpStatus.UNAUTHORIZED);
    if (!(await argon2.verify(user.password, password)))
      throw new AppHttpException(
        [
          { field: 'email', message: 'Email is invalid' },
          { field: 'password', message: 'Password is invalid' },
        ],
        HttpStatus.BAD_REQUEST,
      );

    return this.getAuthToken(user.id);
  }

  public async logout(tokenUuid: TokenUuid | undefined) {
    if (!tokenUuid) throw new AppHttpException('Token not found', HttpStatus.NOT_FOUND);
    await this.tokensRepository.deleteToken(tokenUuid);
  }

  public async updateAccessToken(userId?: UserId, tokenUuid?: TokenUuid) {
    if (!userId || !tokenUuid) throw new AppHttpException('Data not found', HttpStatus.NOT_FOUND);

    return await this.tokensService.getAccessToken(userId, tokenUuid);
  }
}
