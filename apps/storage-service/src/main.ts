import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  ConfigService,
  DEFAULT_CONFIG,
  Microservice,
} from '@bc-arch-drafter/api-config';

async function bootstrap() {
  const configService = new ConfigService(DEFAULT_CONFIG);
  configService.loadFromEnv();

  const options = configService.get().services[Microservice.STORAGE];

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    options,
  );
  await app.listen();
}
bootstrap();
