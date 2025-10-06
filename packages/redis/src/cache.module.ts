import { ConfigModule, ConfigService } from '@bc-arch-drafter/api-config';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const { cacheDb, host, port } = config.get().redis;
        return {
          store: await redisStore({
            database: cacheDb,
            socket: { host, port },
          }),
          ttl: 60,
        };
      },
      isGlobal: true,
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
