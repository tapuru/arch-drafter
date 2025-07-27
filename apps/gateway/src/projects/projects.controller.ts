import { Controller, Get, Inject } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(@Inject() private readonly projectsService: ProjectsService) {}

  @Get('hello')
  async getHello() {
    return this.projectsService.getHello();
  }
}
