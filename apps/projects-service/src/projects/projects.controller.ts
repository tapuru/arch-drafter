import {
  CreateProjectRequestDto,
  CreateProjectRequestSchema,
  DeleteProjectRequestDto,
  DeleteProjectRequestSchema,
  DeleteProjectResponseDto,
  GetProjectByIdRequestDto,
  GetProjectByIdRequestSchema,
  parseProjectResponse,
  ProjectsApi,
  UpdateProjectRequestDto,
  UpdateProjectRequestSchema,
} from '@bc-arch-drafter/contracts';
import { ZodValidationPipe } from '@bc-arch-drafter/lib';
import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { ProjectsServiceImpl } from './projects.service';

//TODO: add strict typing
@Controller()
export class ProjectsController implements ProjectsApi {
  constructor(private readonly projectsService: ProjectsServiceImpl) {}

  @UsePipes(new ZodValidationPipe(GetProjectByIdRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'projects.get-by-id' })
  async getProjectById(@Payload() { id }: GetProjectByIdRequestDto) {
    const project = await this.projectsService.getProjectById(id);
    return parseProjectResponse(project);
  }

  @UsePipes(new ZodValidationPipe(CreateProjectRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'projects.create' })
  async createProject(@Payload() payload: CreateProjectRequestDto) {
    const project = await this.projectsService.createProject(payload);
    return parseProjectResponse(project);
  }

  @UsePipes(new ZodValidationPipe(UpdateProjectRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'projects.update' })
  async updateProject(@Payload() payload: UpdateProjectRequestDto) {
    const project = await this.projectsService.updateProject(payload.id, payload.data);
    return parseProjectResponse(project);
  }

  @UsePipes(new ZodValidationPipe(DeleteProjectRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'projects.delete' })
  async deleteProject(@Payload() payload: DeleteProjectRequestDto): Promise<DeleteProjectResponseDto> {
    const res = await this.projectsService.deleteProject(payload.id);
    return res;
  }
}
