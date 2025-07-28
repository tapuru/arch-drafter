import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectsController, ProjectsService } from '@/projects';
import { SesisonsService, SessionsController } from '@/sessions';
import { ExportController, ExportService } from '@/export';

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
  ],
  controllers: [ProjectsController, SessionsController, ExportController],
  providers: [ProjectsService, SesisonsService, ExportService],
})
export class AppModule {}
