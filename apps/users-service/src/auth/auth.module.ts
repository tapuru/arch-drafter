import { DatabaseModule, UsersRepository } from '@bc-arch-drafter/postgres-db';
import { Module } from '@nestjs/common';

import { AuthController } from '@/auth/auth.controller';

import { AuthServiceImpl } from './auth.service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthServiceImpl, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
