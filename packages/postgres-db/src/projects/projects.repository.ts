import { Connections } from '@bc-arch-drafter/api-config';
import { Project, ProjectId, ProjectsService } from '@bc-arch-drafter/model';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import type { Database } from '@/shared';

import { projects } from './projects.schema';

type ProjectsRelations = {
  invites?: true;
  owner?: true;
  members?: true;
};

@Injectable()
export class ProjectsRepository {
  constructor(@Inject(Connections.POSTGRES) private readonly db: Database) {}
  async getById<TRelations extends ProjectsRelations>(id: ProjectId, options?: { relations?: TRelations }) {
    const project = await this.db.query.projects.findFirst({
      where: eq(projects.id, id),
      with: options?.relations as TRelations,
    });
    return project;
  }

  async create(data: Pick<Project, 'name' | 'ownerId'>) {
    const [project] = await this.db.insert(projects).values(data).returning();
    return project;
  }

  async update(id: ProjectId, data: Parameters<ProjectsService['updateProject']>[1]) {
    await this.db.update(projects).set(data).where(eq(projects.id, id));
    return this.db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1)
      .then((rows) => rows[0]);
  }

  async delete(id: ProjectId) {
    await this.db.update(projects).set({ deletedAt: new Date().toISOString() });
  }
}
