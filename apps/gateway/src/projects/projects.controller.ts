import { Microservice } from '@bc-arch-drafter/api-config';
import { GetProjectByIdRequestDto, ProjectResponseDto } from '@bc-arch-drafter/contracts';
import { parseProjectId } from '@bc-arch-drafter/model';
import { BadRequestException, Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('projects')
export class ProjectsController {
  constructor(@Inject(Microservice.PROJECTS) private readonly client: ClientProxy) {}

  @Get('/:id')
  async getProjectById(@Param('id') id: string): Promise<ProjectResponseDto> {
    try {
      const res = await lastValueFrom(
        this.client.send<ProjectResponseDto, GetProjectByIdRequestDto>(
          { cmd: 'projects.get-by-id' },
          { id: parseProjectId(id) },
        ),
      );
      return res;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }
}
