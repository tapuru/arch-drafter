import { MethodFromAction } from '@/shared';

import { ProjectsActions } from './actions.type';

// type CreateProject = (data: CreateProjectRequestDto) => Promise<ProjectResponseDto>;
// type UpdateProject = (data: UpdateProjectRequestDto) => Promise<ProjectResponseDto>;
// type GetProjectById = (data: GetProjectByIdRequestDto) => Promise<ProjectResponseDto>;
// type DeleteProject = (data: DeleteProjectRequestDto) => Promise<DeleteProjectResponseDto>;

export interface ProjectsApi {
  // createProject: MethodFromAction<'projects.create', ProjectsActions>;
  getProjectById: MethodFromAction<'projects.get-by-id', ProjectsActions>;
  // updateProject: MethodFromAction<'projects.update', ProjectsActions>;
  // deleteProject: MethodFromAction<'project.delete', ProjectsActions>;
}
