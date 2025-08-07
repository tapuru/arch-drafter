import { GetProjectByIdRequestDto, ProjectsApi } from '@bc-arch-drafter/contracts';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ProjectsServiceImpl } from './projects.service';

@Controller()
export class ProjectsController implements ProjectsApi {
  constructor(private readonly projectsService: ProjectsServiceImpl) {}

  @MessagePattern({ cmd: 'projects.get-by-id' })
  getProjectById(@Payload() { id }: GetProjectByIdRequestDto) {
    return this.projectsService.getProjectById(id);
  }
}
