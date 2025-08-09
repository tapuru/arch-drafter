import {
  CreateProjectRequestDto,
  DeleteProjectRequestDto,
  DeleteProjectResponseDto,
  GetProjectByIdRequestDto,
  parseCreateProjectRequest,
  parseDeleteProjectRequest,
  parseProjectResponse,
  parseUpdateProjectRequest,
  ProjectsApi,
  UpdateProjectRequestDto,
} from '@bc-arch-drafter/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { ProjectsServiceImpl } from './projects.service';

//TODO: add strict typing
@Controller()
export class ProjectsController implements ProjectsApi {
  constructor(private readonly projectsService: ProjectsServiceImpl) {}

  @MessagePattern({ cmd: 'projects.get-by-id' })
  async getProjectById(@Payload() { id }: GetProjectByIdRequestDto) {
    try {
      const project = await this.projectsService.getProjectById(id);
      return parseProjectResponse(project);
    } catch (error) {
      throw new RpcException(JSON.stringify(error));
    }
  }

  @MessagePattern({ cmd: 'projects.create' })
  async createProject(@Payload() payload: CreateProjectRequestDto) {
    try {
      //TODO: use decorator
      const data = parseCreateProjectRequest(payload);
      const project = await this.projectsService.createProject(data);
      const res = parseProjectResponse(project);

      return res;
    } catch (error) {
      console.log(error);
      throw new RpcException(JSON.stringify(error));
    }
  }

  @MessagePattern({ cmd: 'projects.update' })
  async updateProject(@Payload() payload: UpdateProjectRequestDto) {
    try {
      //TODO: use decorator
      const { id, data } = parseUpdateProjectRequest(payload);
      const project = await this.projectsService.updateProject(id, data);
      return parseProjectResponse(project);
    } catch (error) {
      throw new RpcException(JSON.stringify(error));
    }
  }

  @MessagePattern({ cmd: 'projects.delete' })
  async deleteProject(@Payload() payload: DeleteProjectRequestDto): Promise<DeleteProjectResponseDto> {
    try {
      //TODO: use decorator
      const { id } = parseDeleteProjectRequest(payload);
      const res = await this.projectsService.deleteProject(id);
      return res;
    } catch (error) {
      throw new RpcException(JSON.stringify(error));
    }
  }
}
