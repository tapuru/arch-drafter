import {
  DatabaseModule,
  InvitesRepository,
  MembershipsRepository,
  TransactionManager,
} from '@bc-arch-drafter/postgres-db';
import { Module } from '@nestjs/common';

import { InvitesController } from './invites.controller';
import { InvitesServiceImpl } from './invites.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InvitesController],
  providers: [MembershipsRepository, InvitesServiceImpl, InvitesRepository, TransactionManager],
})
export class InvitesModule {}
