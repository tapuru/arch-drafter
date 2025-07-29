import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { resolve } from 'path';
import { DEFAULT_CONFIG } from '@bc-arch-drafter/api-config';

const NODE_ENV = process.env.NODE_ENV || 'development';

config({ path: resolve(process.cwd(), `../../.env.${NODE_ENV}`) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.GATEWAY_PORT ?? DEFAULT_CONFIG.port;

  await app.listen(PORT, () =>
    console.log(`Gateway app started at port ${PORT}`),
  );
}
bootstrap();
