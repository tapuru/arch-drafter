import { DEFAULT_CONFIG } from '@bc-arch-drafter/api-config';
import { RpcExceptionsInterceptor } from '@bc-arch-drafter/lib';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { resolve } from 'path';

import { AppModule } from './app.module';

const NODE_ENV = process.env.NODE_ENV || 'development';

config({ path: resolve(process.cwd(), `../../.env.${NODE_ENV}`) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.GATEWAY_PORT ?? DEFAULT_CONFIG.port;

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalInterceptors(new RpcExceptionsInterceptor());

  await app.listen(PORT, () => console.log(`Gateway app started at port ${PORT}`));
}
bootstrap();
