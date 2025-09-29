import { ConfigModule, Microservice, ConfigService } from '@bc-arch-drafter/api-config';
import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { AuthModule } from '@/auth/auth.module';
import { ExportController } from '@/export';
import { InvitesController, MembeshipsController, ProjectsController } from '@/projects';
import { SessionsController } from '@/sessions';
import { StorageController } from '@/storage';
import { UsersController } from '@/users';

@Module({
  imports: [ConfigModule, AuthModule],
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
      provide: Microservice.SESSIONS,
      useFactory: (configService: ConfigService) => {
        const options = configService.get().services.SESSIONS_SERVICE;
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
    SessionsController,
    ExportController,
    StorageController,
    UsersController,
    InvitesController,
    MembeshipsController,
  ],
})
export class AppModule {}
