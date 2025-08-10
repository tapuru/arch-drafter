import { DatabaseModule } from '@bc-arch-drafter/postgres-db';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
})
export class AppModule {}
