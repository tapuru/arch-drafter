import { DatabaseModule, ProjectsRepository, TransactionManager } from '@bc-arch-drafter/postgres-db';
import { Module } from '@nestjs/common';

import { ProjectsController } from './projects.controller';
import { ProjectsServiceImpl } from './projects.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController],
  providers: [ProjectsServiceImpl, ProjectsRepository, TransactionManager],
})
export class ProjectsModule {}
