import { CreateProjectRequestDto } from './dtos/create-project.dto';
import { DeleteProjectRequestDto, DeleteProjectResponseDto } from './dtos/delete-project.dto';
import { GetProjectByIdRequestDto } from './dtos/get-project.dto';
import { ProjectResponseDto } from './dtos/project-response.dto';
import { UpdateProjectRequestDto } from './dtos/update-project.dto';

export type ProjectsActions = {
  'projects.get-by-id': {
    request: GetProjectByIdRequestDto;
    response: ProjectResponseDto;
  };
  'projects.create': {
    request: CreateProjectRequestDto;
    response: ProjectResponseDto;
  };
  'projects.update': {
    request: UpdateProjectRequestDto;
    response: ProjectResponseDto;
  };
  'projects.delete': {
    request: DeleteProjectRequestDto;
    response: DeleteProjectResponseDto;
  };
};
