import { Connections } from '@bc-arch-drafter/api-config';
import { Email, User, UserName, Password } from '@bc-arch-drafter/model';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { users } from './users.schema';

const schema = {
  users,
};

@Injectable()
export class UsersRepository {
  constructor(@Inject(Connections.POSTGRES) private readonly db: NodePgDatabase<typeof schema>) {}
  public async createUser(name: UserName, email: Email, password: Password) {
    await this.db.insert(users).values({ name, email, password });

    return this.db.select().from(users).where(eq(users.email, email));
  }

  public async findById(userId: User['id']) {
    return await this.db.query.users.findFirst({
      where: eq(users.id, userId),
    });
  }

  public async findByEmail(email: Email) {
    return await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }
}
