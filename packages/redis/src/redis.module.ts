import { ConfigService } from '@bc-arch-drafter/api-config';
import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

import { REDIS_PROVIDERS } from './consts';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_PROVIDERS.PUB,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const { host, port, wsDb } = config.get().redis;
        return new Redis({ host, port, db: wsDb });
      },
    },
    {
      provide: REDIS_PROVIDERS.SUB,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const { host, port, wsDb } = config.get().redis;
        return new Redis({ host, port, db: wsDb });
      },
    },
    {
      provide: REDIS_PROVIDERS.CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const { host, port, wsDb } = config.get().redis;
        return new Redis({ host, port, db: wsDb });
      },
    },
  ],
})
export class RedisModule {}
