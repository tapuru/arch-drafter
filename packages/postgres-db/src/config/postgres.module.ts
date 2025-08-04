import { ConfigModule, ConfigService, Connections } from '@bc-arch-drafter/api-config';
import { Module } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { projects } from '../projects';

const schema = {
  projects,
};

export type PostgresDb = NodePgDatabase<typeof schema>;

@Module({
  providers: [
    {
      provide: Connections.POSTGRES,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.get().postgres.url,
        });
        return drizzle(pool, {
          schema,
        });
      },
      inject: [ConfigService],
    },
  ],
  imports: [ConfigModule],
  exports: [Connections.POSTGRES, ConfigModule],
})
export class DatabaseModule {}
