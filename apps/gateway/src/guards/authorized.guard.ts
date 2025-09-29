import { AppHttpException } from '@bc-arch-drafter/lib';
import { UsersRepository } from '@bc-arch-drafter/postgres-db';
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { TokensServiceImpl } from '@/auth/tokens.service';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  public constructor(
    private readonly userRepository: UsersRepository,
    private readonly tokensService: TokensServiceImpl,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const accessToken = request.headers.authorization?.startsWith('Bearer ') && request.headers.authorization.slice(7);
    if (!accessToken) throw new AppHttpException('Token not found', HttpStatus.NOT_FOUND);

    const { userId, refreshUuid } = await this.tokensService.verifyAccessToken(accessToken);

    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppHttpException('User not found', HttpStatus.NOT_FOUND);

    request.user = user;
    request.tokenUuid = refreshUuid;

    return true;
  }
}
