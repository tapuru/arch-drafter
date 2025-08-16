import { Connections } from '@bc-arch-drafter/api-config';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { InvitesRepository } from '@/invites';
import { MembershipsRepository } from '@/memberships';
import { ProjectsRepository } from '@/projects';
import * as schema from '@/schema';

type UnitOfWork = {
  projects: ProjectsRepository;
  memberships: MembershipsRepository;
  invites: InvitesRepository;
};

@Injectable()
export class TransactionManager {
  constructor(@Inject(Connections.POSTGRES) private readonly db: NodePgDatabase<typeof schema>) {}

  async runInTransaction<T>(fn: (uow: UnitOfWork) => Promise<T>): Promise<T> {
    return this.db.transaction(async (tx) => {
      const uow: UnitOfWork = {
        projects: new ProjectsRepository(tx),
        invites: new InvitesRepository(tx),
        memberships: new MembershipsRepository(tx),
      };
      return fn(uow);
    });
  }
}
