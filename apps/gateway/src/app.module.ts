import { ConfigModule, Microservice, ConfigService } from '@bc-arch-drafter/api-config';
import { RedisCacheModule } from '@bc-arch-drafter/redis';
import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { AuthModule } from '@/auth/auth.module';
import { ExportController } from '@/export';
import { InvitesController, MembeshipsController, ProjectsController } from '@/projects';
import { RoomsController } from '@/rooms';
import { StorageController } from '@/storage';
import { UsersController } from '@/users';

@Module({
  imports: [ConfigModule, AuthModule, RedisCacheModule],
  providers: [
    {
      provide: Microservice.PROJECTS,
      useFactory: (configService: ConfigService) => {
        const options = configService.get().services.PROJECTS_SERVICE;
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    {
      provide: Microservice.ROOMS,
      useFactory: (configService: ConfigService) => {
        const options = configService.get().services.ROOMS_SERVICE;
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    {
      provide: Microservice.EXPORT,
      useFactory: (configService: ConfigService) => {
        const { options, transport } = configService.get().services.EXPORT_SERVICE;
        return ClientProxyFactory.create({ transport, options });
      },
      inject: [ConfigService],
    },
    {
      provide: Microservice.STORAGE,
      useFactory: (configService: ConfigService) => {
        const { options, transport } = configService.get().services.STORAGE_SERVICE;
        return ClientProxyFactory.create({ transport, options });
      },
      inject: [ConfigService],
    },
    {
      provide: Microservice.USERS,
      useFactory: (configService: ConfigService) => {
        const { options, transport } = configService.get().services.USERS_SERVICE;
        return ClientProxyFactory.create({ transport, options });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [
    ProjectsController,
    RoomsController,
    ExportController,
    StorageController,
    UsersController,
    InvitesController,
    MembeshipsController,
  ],
})
export class AppModule {}
