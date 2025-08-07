import {
  CreateProjectRequestDto,
  CreateProjectResponseDto,
} from "../dtos/create-project.dto";
import {
  DeleteProjectRequestDto,
  DeleteProjectResponseDto,
} from "../dtos/delete-project.dto";
import {
  GetProjectByIdRequestDto,
  GetProjectByIdResponseDto,
} from "../dtos/get-project.dto";
import {
  UpdateProjectRequestDto,
  UpdateProjectResponseDto,
} from "../dtos/update-project.dto";

export type GetProjectById = (
  data: GetProjectByIdRequestDto,
) => Promise<GetProjectByIdResponseDto>;

export type CreateProject = (
  data: CreateProjectRequestDto,
) => Promise<CreateProjectResponseDto>;

export type UpdateProject = (
  data: UpdateProjectRequestDto,
) => Promise<UpdateProjectResponseDto>;

export type DeleteProject = (
  data: DeleteProjectRequestDto,
) => Promise<DeleteProjectResponseDto>;

export interface ProjectsService {
  getProjectById: GetProjectById;
  createProject: CreateProject;
  updateProject: UpdateProject;
  deleteProject: DeleteProject;
}
