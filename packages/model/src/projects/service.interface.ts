import { Project, ProjectId } from './project.schema';

export type GetProjectById = (id: ProjectId) => Promise<Project>;

export type CreateProject = (data: Pick<Project, 'name' | 'ownerId'>) => Promise<Project>;

export type UpdateProject = (data: Partial<Pick<Project, 'name' | 'canvasJson' | 'ownerId'>>) => Promise<Project>;

export type DeleteProject = (id: ProjectId) => Promise<{ success: boolean }>;

export interface ProjectsService {
  getProjectById: GetProjectById;
  // createProject: CreateProject;
  // updateProject: UpdateProject;
  // deleteProject: DeleteProject;
}
