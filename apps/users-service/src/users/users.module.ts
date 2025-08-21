import { DatabaseModule, UsersRepository } from '@bc-arch-drafter/postgres-db';
import { Module } from '@nestjs/common';

import { UsersController } from '@/users/users.controller';
import { UsersServiceImpl } from '@/users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersServiceImpl, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
