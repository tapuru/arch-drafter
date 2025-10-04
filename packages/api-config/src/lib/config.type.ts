import { Transport } from '@nestjs/microservices';

import { Microservice } from './microservices.enum';

export interface MicroserviceConfig {
  options: {
    host: string;
    port: number;
  };
  //TODO: find a way to include any transport type not only TCP
  transport: Transport.TCP;
  payload?: {
    TOKEN_SECRET?: string;
    TOKEN_ACCESS_TTL?: string;
    TOKEN_REFRESH_TTL?: string;
    TOKEN_VERIFY_TTL?: string;
  };
}

export interface PostgresConfig {
  url: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  cacheDb: number;
  wsDb: number;
}

export interface ConfigData {
  env: string;
  port: number;
  services: Record<Microservice, MicroserviceConfig>;
  postgres: PostgresConfig;
  redis: RedisConfig;
}
