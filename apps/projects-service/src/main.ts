import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService, DEFAULT_CONFIG, Microservice } from '@bc-arch-drafter/api-config';
import { config } from 'dotenv';
import { resolve } from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';

config({ path: resolve(process.cwd(), `../../.env.${NODE_ENV}`) });

async function bootstrap() {
  const configService = new ConfigService(DEFAULT_CONFIG);
  configService.loadFromEnv();

  const options = configService.get().services[Microservice.PROJECTS];

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, options);
  await app.listen();
}
bootstrap();
