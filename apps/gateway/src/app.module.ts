import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectsController, ProjectsService } from './projects';

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
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class AppModule {}
