import { ConfigModule, ConfigService, Connections } from '@bc-arch-drafter/api-config';
import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '../config/schema';

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
