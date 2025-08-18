import { DatabaseModule, InvitesRepository, MembershipsRepository } from '@bc-arch-drafter/postgres-db';
import { Module } from '@nestjs/common';

import { MemberhipsController } from './memberships.controller';
import { MemberhipsServiceImpl } from './memberships.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberhipsController],
  providers: [MembershipsRepository, MemberhipsServiceImpl, InvitesRepository],
})
export class MembershipsModule {}
