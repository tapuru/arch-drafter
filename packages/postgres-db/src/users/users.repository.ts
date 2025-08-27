import { Connections } from '@bc-arch-drafter/api-config';
import { Email, User, UserName, Password, UserService } from '@bc-arch-drafter/model';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import type { Database } from '@/shared';

import { users } from './users.schema';

type UsersRelations = {
  sentInvites?: true;
  invites?: true;
  memberships?: true;
};

@Injectable()
export class UsersRepository {
  constructor(@Inject(Connections.POSTGRES) private readonly db: Database) {}
  public async createUser(name: UserName, email: Email, password: Password) {
    await this.db.insert(users).values({ name, email, password, isVerified: true });

    return this.db.select().from(users).where(eq(users.email, email));
  }

  public async findById<TRelations extends UsersRelations>(userId: User['id'], options?: { relations: TRelations }) {
    return this.db.query.users.findFirst({
      where: eq(users.id, userId),
      with: options?.relations as TRelations,
    });
  }

  public async findByEmail<TRelations extends UsersRelations>(email: Email, options?: { relations: TRelations }) {
    return this.db.query.users.findFirst({
      where: eq(users.email, email),
      with: options?.relations as TRelations,
    });
  }

  public async updateUser(userId: User['id'], data: Parameters<UserService['updateUserById']>[1]) {
    await this.db
      .update(users)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(users.id, userId));

    return this.db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .then((rows) => rows[0]);
  }

  public async deleteUser(userId: User['id']) {
    this.db
      .update(users)
      .set({
        deleteAt: new Date().toISOString(),
      })
      .where(eq(users.id, userId));
  }
}
