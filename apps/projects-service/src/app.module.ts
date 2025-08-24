import { Module } from '@nestjs/common';

import { InvitesModule } from '@/invites';
import { MembershipsModule } from '@/memberships';
import { ProjectsModule } from '@/projects';

@Module({
  imports: [ProjectsModule, MembershipsModule, InvitesModule],
})
export class AppModule {}
