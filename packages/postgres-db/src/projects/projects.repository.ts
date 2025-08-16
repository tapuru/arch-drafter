import { Connections } from '@bc-arch-drafter/api-config';
import { Project, ProjectId, ProjectsService } from '@bc-arch-drafter/model';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { projects, projectsRelations } from './projects.schema';

const schema = {
  projects,
  projectsRelations,
};

@Injectable()
export class ProjectsRepository {
  constructor(@Inject(Connections.POSTGRES) private readonly db: NodePgDatabase<typeof schema>) {}

  async getById(id: ProjectId) {
    const project = await this.db.query.projects.findFirst({ where: eq(schema.projects.id, id) });
    return project;
  }

  async create(data: Pick<Project, 'name' | 'ownerId'>) {
    const [project] = await this.db.insert(schema.projects).values(data).returning();
    return project;
  }

  async update(id: ProjectId, data: Parameters<ProjectsService['updateProject']>[1]) {
    await this.db.update(schema.projects).set(data).where(eq(schema.projects.id, id));
    return this.db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.id, id))
      .limit(1)
      .then((rows) => rows[0]);
  }

  async delete(id: ProjectId) {
    await this.db.update(schema.projects).set({ deletedAt: new Date().toISOString() });
  }
}
