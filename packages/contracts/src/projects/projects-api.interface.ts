import { CreateProjectRequestDto } from './dtos/create-project.dto';
import { DeleteProjectRequestDto, DeleteProjectResponseDto } from './dtos/delete-project.dto';
import { GetProjectByIdRequestDto } from './dtos/get-project.dto';
import { ProjectResponseDto } from './dtos/project-response.dto';
import { UpdateProjectRequestDto } from './dtos/update-project.dto';

type CreateProject = (data: CreateProjectRequestDto) => Promise<ProjectResponseDto>;
type UpdateProject = (data: UpdateProjectRequestDto) => Promise<ProjectResponseDto>;
type GetProjectById = (data: GetProjectByIdRequestDto) => Promise<ProjectResponseDto>;
type DeleteProject = (data: DeleteProjectRequestDto) => Promise<DeleteProjectResponseDto>;

export interface ProjectsApi {
  // createProject: CreateProject;
  // updateProject: UpdateProject;
  getProjectById: GetProjectById;
  // deleteProject: DeleteProject;
}
