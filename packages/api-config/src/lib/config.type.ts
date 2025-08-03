import { Transport } from '@nestjs/microservices';

import { Microservice } from './microservices.enum';

export interface MicroserviceConfig {
  options: {
    host: string;
    port: number;
  };
  //TODO: find a way to include any transport type not only TCP
  transport: Transport.TCP;
}

export interface PostgresConfig {
  url: string;
}

export interface ConfigData {
  env: string;
  port: number;
  services: Record<Microservice, MicroserviceConfig>;
  postgres: PostgresConfig;
}
