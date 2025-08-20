import { Connections } from '@bc-arch-drafter/api-config';
import { Inject, Injectable } from '@nestjs/common';

import type { Database } from '@/shared';

import { InvitesRepository } from '@/invites';
import { MembershipsRepository } from '@/memberships';
import { ProjectsRepository } from '@/projects';

type UnitOfWork = {
  projects: ProjectsRepository;
  memberships: MembershipsRepository;
  invites: InvitesRepository;
};

@Injectable()
export class TransactionManager {
  constructor(@Inject(Connections.POSTGRES) private readonly db: Database) {}

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
