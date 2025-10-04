import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import type { ConfigData, RedisConfig } from '@/lib/config.type';

import { MicroserviceConfig, PostgresConfig } from '@/lib/config.type';
import { Microservice } from '@/lib/microservices.enum';

import { DEFAULT_CONFIG } from './lib/default-config.const';

@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData) {
    this.config = data;
  }

  public loadFromEnv() {
    this.config = this.parseFromEnv(process.env);
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }

  private parseFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: parseInt(env.GATEWAY_PORT || `${DEFAULT_CONFIG.port}`),
      postgres: this.parsePostgresConfigFromEnv(env),
      redis: this.parseRedisConfigFromEnv(env),
      services: {
        PROJECTS_SERVICE: {
          options: this.parseServiceOptionsFromEnv(Microservice.PROJECTS, env),
          transport: Transport.TCP,
        },
        SESSIONS_SERVICE: {
          options: this.parseServiceOptionsFromEnv(Microservice.SESSIONS, env),
          transport: Transport.TCP,
        },
        STORAGE_SERVICE: {
          options: this.parseServiceOptionsFromEnv(Microservice.STORAGE, env),
          transport: Transport.TCP,
        },
        EXPORT_SERVICE: {
          options: this.parseServiceOptionsFromEnv(Microservice.EXPORT, env),
          transport: Transport.TCP,
        },
        USERS_SERVICE: {
          options: this.parseServiceOptionsFromEnv(Microservice.USERS, env),
          transport: Transport.TCP,
          payload: {
            TOKEN_SECRET: env.TOKEN_SECRET || DEFAULT_CONFIG.services.USERS_SERVICE.payload?.TOKEN_SECRET,
            TOKEN_ACCESS_TTL: env.TOKEN_ACCESS_TTL || DEFAULT_CONFIG.services.USERS_SERVICE.payload?.TOKEN_ACCESS_TTL,
            TOKEN_REFRESH_TTL:
              env.TOKEN_REFRESH_TTL || DEFAULT_CONFIG.services.USERS_SERVICE.payload?.TOKEN_REFRESH_TTL,
            TOKEN_VERIFY_TTL: env.TOKEN_VERIFY_TTL || DEFAULT_CONFIG.services.USERS_SERVICE.payload?.TOKEN_VERIFY_TTL,
          },
        },
      },
    };
  }

  private parseServiceOptionsFromEnv(name: Microservice, env: NodeJS.ProcessEnv): MicroserviceConfig['options'] {
    return {
      host: env[`${name}_HOST`] || `${DEFAULT_CONFIG.services[name].options.host}`,
      port: parseInt(env[`${name}_PORT`] || `${DEFAULT_CONFIG.services[name].options.port}`),
    };
  }

  private parseRedisConfigFromEnv(env: NodeJS.ProcessEnv): RedisConfig {
    return {
      host: env.REDIS_HOST || DEFAULT_CONFIG.redis.host,
      port: parseInt(env.REDIS_PORT || `${DEFAULT_CONFIG.redis.port}`),
      cacheDb: parseInt(env.REDIS_CACHE_DB || `${DEFAULT_CONFIG.redis.cacheDb}`),
      wsDb: parseInt(env.REDIS_WS_DB || `${DEFAULT_CONFIG.redis.wsDb}`),
    };
  }

  private parsePostgresConfigFromEnv(env: NodeJS.ProcessEnv): PostgresConfig {
    return {
      url: env.POSTGRES_URL || DEFAULT_CONFIG.postgres.url,
    };
  }
}
