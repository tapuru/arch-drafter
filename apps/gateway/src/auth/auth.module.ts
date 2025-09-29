import { UsersRepository, TokensRepository, DatabaseModule } from '@bc-arch-drafter/postgres-db';
import { Module } from '@nestjs/common';

import { AuthController } from '@/auth/auth.controller';
import { AuthServiceImpl } from '@/auth/auth.service';
import { CookiesService } from '@/auth/cookies.service';
import { TokensServiceImpl } from '@/auth/tokens.service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthServiceImpl, UsersRepository, TokensServiceImpl, TokensRepository, CookiesService],
  controllers: [AuthController],
})
export class AuthModule {}
