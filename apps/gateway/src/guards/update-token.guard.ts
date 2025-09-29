import { AppHttpException } from '@bc-arch-drafter/lib';
import { UsersRepository } from '@bc-arch-drafter/postgres-db';
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { TokensServiceImpl } from '@/auth/tokens.service';

@Injectable()
export class UpdateTokenGuard implements CanActivate {
  public constructor(
    private readonly userRepository: UsersRepository,
    private readonly tokensService: TokensServiceImpl,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const refreshToken = request.cookies?.refreshToken as string | undefined;
    if (!refreshToken) throw new AppHttpException('Token not found', HttpStatus.NOT_FOUND);

    const { tokenRow } = await this.tokensService.verifyRefreshToken(refreshToken);

    const user = await this.userRepository.findById(tokenRow.userId);
    if (!user) throw new AppHttpException('User not found', HttpStatus.NOT_FOUND);

    request.user = user;
    request.tokenUuid = tokenRow.tokenUuid;

    return true;
  }
}
