import { AppRpcException } from '@bc-arch-drafter/lib';
import { Project, ProjectId, ProjectsService } from '@bc-arch-drafter/model';
import { ProjectsRepository } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsServiceImpl implements ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async getProjectById(id: ProjectId) {
    const project = await this.projectsRepository.getById(id);
    if (!project || project.deletedAt !== null) {
      throw new AppRpcException('project not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  async createProject(data: Pick<Project, 'name' | 'ownerId'>) {
    const project = await this.projectsRepository.create(data);
    return project;
  }

  async updateProject(id: ProjectId, data: Parameters<ProjectsService['updateProject']>[1]) {
    const project = await this.projectsRepository.getById(id);
    if (!project) {
      throw new AppRpcException('project not found', HttpStatus.NOT_FOUND);
    }

    const res = await this.projectsRepository.update(id, data);
    return res;
  }

  async deleteProject(id: ProjectId) {
    const project = await this.projectsRepository.getById(id);
    if (!project) {
      throw new AppRpcException('project not found', HttpStatus.NOT_FOUND);
    }

    await this.projectsRepository.delete(id);
    return { success: true };
  }
}
