import { Connections } from '@bc-arch-drafter/api-config';
import { Invite, InviteId, InviteStatus, MembershipService, ProjectId, UserId } from '@bc-arch-drafter/model';
import { Inject, Injectable } from '@nestjs/common';
import { and, count, eq } from 'drizzle-orm';

import type { Database, FindManyOptions } from '@/shared';

import { buildOrderBy, DEFAULT_PAGE_SIZE } from '@/shared';

import { invites } from './invites.schema';

//TODO: figure out a better way to type relations
type InvitesRelations = { project?: true; sender?: true; user?: true };

@Injectable()
export class InvitesRepository {
  constructor(@Inject(Connections.POSTGRES) private readonly db: Database) {}

  async findById<TRelations extends InvitesRelations>(id: InviteId, options?: { relations?: TRelations }) {
    const invite = await this.db.query.invites.findFirst({
      where: eq(invites.id, id),
      with: options?.relations as TRelations,
    });
    return invite;
  }

  async findMany<TRelations extends InvitesRelations>(
    options?: FindManyOptions<
      typeof invites,
      {
        filters: { status?: InviteStatus; userId?: UserId; senderId?: UserId; projectId?: ProjectId };
        relations: InvitesRelations;
        sortBy: 'sentAt' | 'rejectedAt' | 'acceptedAt' | 'canceledAt';
      }
    >,
  ) {
    const conditions = [];
    if (options?.filters?.status) conditions.push(eq(invites.status, options.filters.status));
    if (options?.filters?.userId) conditions.push(eq(invites.userId, options.filters.userId));
    if (options?.filters?.senderId) conditions.push(eq(invites.senderId, options.filters.senderId));
    if (options?.filters?.projectId) conditions.push(eq(invites.projectId, options.filters.projectId));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const page = options?.page && options.page > 0 ? options.page : 1;
    const pageSize = options?.pageSize && options.pageSize > 0 ? options.pageSize : DEFAULT_PAGE_SIZE;
    const offset = (page - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      this.db.query.invites.findMany({
        where: whereClause,
        with: options?.relations as TRelations,
        orderBy: buildOrderBy(invites, options?.sortBy, options?.sortDirection),
        limit: pageSize,
        offset,
      }),
      this.db
        .select({ value: count() })
        .from(invites)
        .where(whereClause)
        .then((res) => res[0]?.value ?? 0),
    ]);
    return { items, totalCount };
  }

  async create(data: Parameters<MembershipService['sendInvite']>[0]) {
    const [invite] = await this.db.insert(invites).values(data).returning();
    return invite;
  }

  async update(id: InviteId, data: Partial<Omit<Invite, 'id'>>) {
    const [updated] = await this.db.update(invites).set(data).where(eq(invites.id, id)).returning();
    return updated ?? null;
  }
}
