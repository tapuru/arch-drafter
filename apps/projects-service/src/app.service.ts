import { Connections } from '@bc-arch-drafter/api-config';
import { PostgresDb } from '@bc-arch-drafter/postgres-db';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject(Connections.POSTGRES) private readonly db: PostgresDb) {}

  // createProject(data: CreateProjectRequestDto) {}

  // getProjectById({ id }: GetProjectByIdRequestDto) {}

  getHello(): { message: string } {
    return { message: 'Hello from projects service' };
  }
}
