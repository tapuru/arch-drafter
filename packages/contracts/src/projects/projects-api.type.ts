import { PROJECTS_ACTIONS } from '@bc-arch-drafter/model';

import { SuccessTrueResponseDto } from '@/responses';
import { ApiFromSpec, ApiSpec } from '@/utils';

import { CreateProjectRequestDto } from './dtos/create-project.dto';
import { DeleteProjectRequestDto } from './dtos/delete-project.dto';
import { GetProjectByIdRequestDto } from './dtos/get-project.dto';
import { ProjectResponseDto } from './dtos/project-response.dto';
import { UpdateProjectRequestDto } from './dtos/update-project.dto';

export type ProjectsApiSpec = ApiSpec<
  typeof PROJECTS_ACTIONS,
  {
    [PROJECTS_ACTIONS.CREATE]: {
      request: CreateProjectRequestDto;
      response: ProjectResponseDto;
    };
    [PROJECTS_ACTIONS.GET_BY_ID]: {
      request: GetProjectByIdRequestDto;
      response: ProjectResponseDto;
    };
    [PROJECTS_ACTIONS.UPDATE]: {
      request: UpdateProjectRequestDto;
      response: ProjectResponseDto;
    };
    [PROJECTS_ACTIONS.DELETE]: {
      request: DeleteProjectRequestDto;
      response: SuccessTrueResponseDto;
    };
  }
>;

export interface ProjectsApi extends ApiFromSpec<ProjectsApiSpec> {}
