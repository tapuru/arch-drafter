import { ConfigService, DEFAULT_CONFIG, Microservice } from '@bc-arch-drafter/api-config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { config } from 'dotenv';
import { resolve } from 'node:path';

import { AppModule } from './app.module';

const NODE_ENV = process.env.NODE_ENV || 'development';

config({ path: resolve(process.cwd(), `../../.env.${NODE_ENV}`) });

async function bootstrap() {
  const configService = new ConfigService(DEFAULT_CONFIG);
  configService.loadFromEnv();

  const options = configService.get().services[Microservice.USERS];

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, options);
  await app.listen();
}
bootstrap();
