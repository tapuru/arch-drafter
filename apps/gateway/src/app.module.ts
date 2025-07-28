import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectsController, ProjectsService } from '@/projects';
import { SesisonsService, SessionsController } from '@/sessions';
import { ExportController, ExportService } from '@/export';
import { StorageController, StorageService } from './storage';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROJECTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'SESSIONS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'EXPORT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'STORAGE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3004,
        },
      },
    ]),
  ],
  controllers: [
    ProjectsController,
    SessionsController,
    ExportController,
    StorageController,
  ],
  providers: [ProjectsService, SesisonsService, ExportService, StorageService],
})
export class AppModule {}
