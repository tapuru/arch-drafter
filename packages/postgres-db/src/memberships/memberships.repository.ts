import { Connections } from '@bc-arch-drafter/api-config';
import { Membership, MemebershipId, ProjectId, UserId, UserProjectRole, SortDirection } from '@bc-arch-drafter/model';
import { Inject, Injectable } from '@nestjs/common';
import { and, count, eq, isNull } from 'drizzle-orm';

import type { Database, FindManyOptions } from '@/shared';

import { buildOrderBy, DEFAULT_PAGE_SIZE } from '@/shared';

import { memberships } from './memberships.schema';

//TODO: figure out a better way to type relations
type MembershipsRelations = { project?: true; user?: true };

@Injectable()
export class MembershipsRepository {
  constructor(@Inject(Connections.POSTGRES) private readonly db: Database) {}

  async findById<TRelations extends MembershipsRelations>(id: MemebershipId, options?: { relations?: TRelations }) {
    const membership = await this.db.query.memberships.findFirst({
      where: and(eq(memberships.id, id), isNull(memberships.leftAt)),
      with: options?.relations as TRelations,
    });
    return membership;
  }

  async findByProjectAndUser<TRelations extends MembershipsRelations>(
    { projectId, userId }: { projectId: ProjectId; userId: UserId },
    options?: { relations?: TRelations },
  ) {
    const membership = await this.db.query.memberships.findFirst({
      where: and(eq(memberships.userId, userId), eq(memberships.projectId, projectId), isNull(memberships.leftAt)),
      with: options?.relations as TRelations,
    });
    return membership;
  }

  async findMany<TRelations extends MembershipsRelations>(
    options?: FindManyOptions<
      typeof memberships,
      {
        filters: { projectId?: ProjectId; userId?: UserId; role?: UserProjectRole };
        relations: TRelations;
        sortBy: 'joinedAt' | 'role';
      }
    >,
  ) {
    const conditions = [isNull(memberships.leftAt)];
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
        with: options?.relations as TRelations,
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

  async softDelete(id: MemebershipId) {
    await this.db.update(memberships).set({ leftAt: new Date().toISOString() }).where(eq(memberships.id, id));
  }
}
