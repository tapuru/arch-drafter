import { Connections } from '@bc-arch-drafter/api-config';
import { Membership, MemebershipId, ProjectId, UserId, UserProjectRole } from '@bc-arch-drafter/model';
import { Inject, Injectable } from '@nestjs/common';
import { and, count, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { buildOrderBy, DEFAULT_PAGE_SIZE } from '@/shared';

import { memberships, membershipsRelations } from './memberships.schema';

const schema = {
  memberships,
  membershipsRelations,
};

//TODO: figure out a better way to type relations
type MembershipsRelations = { project?: true; user?: true };

@Injectable()
export class MembershipsRepository {
  constructor(@Inject(Connections.POSTGRES) private readonly db: NodePgDatabase<typeof schema>) {}

  async getById(id: MemebershipId, options?: { relations?: MembershipsRelations }) {
    const membership = await this.db.query.memberships.findFirst({
      where: eq(memberships.id, id),
      with: options?.relations,
    });
    return membership;
  }

  async getAll(options?: {
    relations?: MembershipsRelations;
    filters?: { projectId?: ProjectId; userId?: UserId; role?: UserProjectRole };
    sortBy?: keyof Pick<typeof memberships, 'joinedAt' | 'role'>;
    sortDirection?: 'DESC' | 'ASC';
    page?: number;
    pageSize?: number;
  }) {
    const conditions = [];
    if (options?.filters?.projectId) conditions.push(eq(memberships.projectId, options.filters.projectId));
    if (options?.filters?.userId) conditions.push(eq(memberships.userId, options.filters.userId));
    if (options?.filters?.role) conditions.push(eq(memberships.role, options.filters.role));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const page = options?.page && options.page > 0 ? options.page : 1;
    const pageSize = options?.pageSize && options.pageSize > 0 ? options.pageSize : DEFAULT_PAGE_SIZE;
    const offset = (page - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      this.db.query.memberships.findMany({
        where: whereClause,
        with: options?.relations,
        orderBy: buildOrderBy(memberships, options?.sortBy, options?.sortDirection),
        limit: pageSize,
        offset,
      }),
      this.db
        .select({ value: count() })
        .from(memberships)
        .where(whereClause)
        .then((res) => res[0]?.value ?? 0),
    ]);
    return { items, totalCount };
  }

  async create(data: { userId: UserId; projectId: ProjectId; role: UserProjectRole }) {
    const [membership] = await this.db.insert(memberships).values(data).returning();
    return membership;
  }

  async update(id: MemebershipId, data: Partial<Omit<Membership, 'id'>>) {
    const [updated] = await this.db.update(memberships).set(data).where(eq(memberships.id, id)).returning();
    return updated ?? null;
  }
}
