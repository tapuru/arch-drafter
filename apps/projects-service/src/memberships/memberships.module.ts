import {
  DatabaseModule,
  InvitesRepository,
  MembershipsRepository,
  TransactionManager,
} from '@bc-arch-drafter/postgres-db';
import { Module } from '@nestjs/common';

import { MemberhipsController } from './memberships.controller';
import { MemberhipsServiceImpl } from './memberships.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberhipsController],
  providers: [MembershipsRepository, MemberhipsServiceImpl],
})
export class MembershipsModule {}
