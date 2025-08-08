import { Microservice } from '@bc-arch-drafter/api-config';
import { API_ROUTES, GetProjectByIdRequestDto, ProjectResponseDto } from '@bc-arch-drafter/contracts';
import { sendMessage } from '@bc-arch-drafter/lib';
import { parseProjectId } from '@bc-arch-drafter/model';
import { BadRequestException, Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller(API_ROUTES.PROJECTS)
export class ProjectsController {
  constructor(@Inject(Microservice.PROJECTS) private readonly client: ClientProxy) {}

  @Get('/:id')
  async getProjectById(@Param('id') id: string): Promise<ProjectResponseDto> {
    try {
      const res = sendMessage({
        client: this.client,
        pattern: { cmd: 'projects.get-by-id' },
        payload: { id: parseProjectId(id) },
      });
      return res;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }
}
