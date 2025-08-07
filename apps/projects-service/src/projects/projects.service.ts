import { ProjectId, ProjectsService } from '@bc-arch-drafter/model';
import { ProjectsRepository } from '@bc-arch-drafter/postgres-db';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProjectsServiceImpl implements ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async getProjectById(id: ProjectId) {
    try {
      const project = await this.projectsRepository.getById(id);
      if (!project) {
        throw new NotFoundException('project not found');
      }
      return project;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(JSON.stringify(error));
      // throw new RpcException('test');
    }
  }
}
