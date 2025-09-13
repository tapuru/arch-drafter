import { AppRpcException } from '@bc-arch-drafter/lib';
import { Project, ProjectId, ProjectsService, UserProjectRoleSchema } from '@bc-arch-drafter/model';
import { ProjectsRepository, TransactionManager } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsServiceImpl implements ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  async getProjectById(id: ProjectId) {
    const project = await this.projectsRepository.findById(id);
    console.log(project);
    if (!project || project.deletedAt !== null) {
      throw new AppRpcException('project not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  async createProject(data: Pick<Project, 'name' | 'ownerId'>) {
    const project = await this.transactionManager.runInTransaction(async ({ projects, memberships }) => {
      const p = await projects.create(data);
      await memberships.create({ projectId: p.id, userId: data.ownerId, role: UserProjectRoleSchema.enum.owner });
      const createdProject = await projects.findById(p.id, { relations: { members: true } });

      if (!createdProject) {
        throw new AppRpcException('Unexpected error during project creation accured', 500);
      }
      return createdProject;
    });
    return project;
  }

  async updateProject(id: ProjectId, data: Parameters<ProjectsService['updateProject']>[1]) {
    const project = await this.projectsRepository.findById(id);
    if (!project) {
      throw new AppRpcException('project not found', HttpStatus.NOT_FOUND);
    }

    const res = await this.projectsRepository.update(id, data);
    return res;
  }

  async deleteProject(id: ProjectId) {
    const project = await this.projectsRepository.findById(id);
    if (!project) {
      throw new AppRpcException('project not found', HttpStatus.NOT_FOUND);
    }

    await this.projectsRepository.delete(id);
    return { success: true };
  }
}
