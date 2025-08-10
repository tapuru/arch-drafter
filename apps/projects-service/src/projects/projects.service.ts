import { Project, ProjectId, ProjectsService } from '@bc-arch-drafter/model';
import { ProjectsRepository } from '@bc-arch-drafter/postgres-db';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectsServiceImpl implements ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async getProjectById(id: ProjectId) {
    const project = await this.projectsRepository.getById(id);
    if (!project || project.deletedAt !== null) throw new NotFoundException('project not found');

    return project;
  }

  async createProject(data: Pick<Project, 'name' | 'ownerId'>) {
    const project = await this.projectsRepository.create(data);
    return project;
  }

  async updateProject(id: ProjectId, data: Parameters<ProjectsService['updateProject']>[1]) {
    const project = await this.projectsRepository.getById(id);
    if (!project) throw new NotFoundException('project not found');

    const res = await this.projectsRepository.update(id, data);
    return res;
  }

  async deleteProject(id: ProjectId) {
    const project = await this.projectsRepository.getById(id);
    if (!project) throw new NotFoundException('project not found');

    await this.projectsRepository.delete(id);
    return { success: true };
  }
}
