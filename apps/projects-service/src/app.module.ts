import { Module } from '@nestjs/common';

import { MembershipsModule } from '@/memberships';
import { ProjectsModule } from '@/projects';

@Module({
  imports: [ProjectsModule, MembershipsModule],
})
export class AppModule {}
