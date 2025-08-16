import { Connections } from '@bc-arch-drafter/api-config';
import { Invite, InviteId, InviteStatus, MembershipService, ProjectId, UserId } from '@bc-arch-drafter/model';
import { Inject, Injectable } from '@nestjs/common';
import { and, count, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { buildOrderBy, DEFAULT_PAGE_SIZE, GetAllOptions } from '@/shared';

import { invites, invitesRelations } from './invites.schema';

const schema = {
  invites,
  invitesRelations,
};

//TODO: figure out a better way to type relations
type InvitesRelations = { project?: true; sender?: true; user?: true };

@Injectable()
export class InvitesRepository {
  constructor(@Inject(Connections.POSTGRES) private readonly db: NodePgDatabase<typeof schema>) {}

  async getById(id: InviteId, options?: { relations?: InvitesRelations }) {
    const membership = await this.db.query.invites.findFirst({
      where: eq(schema.invites.id, id),
      with: options?.relations,
    });
    return membership;
  }

  async getAll(
    options?: GetAllOptions<
      typeof schema.invites,
      {
        filters: { status: InviteStatus; userId: UserId; senderId: UserId; projectId: ProjectId };
        relations: InvitesRelations;
        sortBy: 'sentAt' | 'rejectedAt' | 'acceptedAt' | 'canceledAt';
      }
    >,
  ) {
    const conditions = [];
    if (options?.filters?.status) conditions.push(eq(schema.invites.status, options.filters.status));
    if (options?.filters?.userId) conditions.push(eq(schema.invites.userId, options.filters.userId));
    if (options?.filters?.senderId) conditions.push(eq(schema.invites.senderId, options.filters.senderId));
    if (options?.filters?.projectId) conditions.push(eq(schema.invites.projectId, options.filters.projectId));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const page = options?.page && options.page > 0 ? options.page : 1;
    const pageSize = options?.pageSize && options.pageSize > 0 ? options.pageSize : DEFAULT_PAGE_SIZE;
    const offset = (page - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      this.db.query.invites.findMany({
        where: whereClause,
        with: options?.relations,
        orderBy: buildOrderBy(schema.invites, options?.sortBy, options?.sortDirection),
        limit: pageSize,
        offset,
      }),
      this.db
        .select({ value: count() })
        .from(schema.invites)
        .where(whereClause)
        .then((res) => res[0]?.value ?? 0),
    ]);
    return { items, totalCount };
  }

  async create(data: Parameters<MembershipService['sendInvite']>[0]) {
    const [invite] = await this.db.insert(schema.invites).values(data).returning();
    return invite;
  }

  async update(id: InviteId, data: Partial<Omit<Invite, 'id'>>) {
    const [updated] = await this.db.update(schema.invites).set(data).where(eq(schema.invites.id, id)).returning();
    return updated ?? null;
  }
}
