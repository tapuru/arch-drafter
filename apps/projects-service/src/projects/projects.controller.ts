import {
  CreateProjectRequestDto,
  CreateProjectRequestSchema,
  DeleteProjectRequestDto,
  DeleteProjectRequestSchema,
  GetProjectByIdRequestDto,
  GetProjectByIdRequestSchema,
  parseProjectResponse,
  parseSuccessTrueResponse,
  ProjectsApi,
  SuccessTrueResponseDto,
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
    const data = await this.projectsService.getProjectById(id);
    return parseProjectResponse({ success: true, data });
  }

  @UsePipes(new ZodValidationPipe(CreateProjectRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'projects.create' })
  async createProject(@Payload() payload: CreateProjectRequestDto) {
    const data = await this.projectsService.createProject(payload);
    return parseProjectResponse({ success: true, data });
  }

  @UsePipes(new ZodValidationPipe(UpdateProjectRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'projects.update' })
  async updateProject(@Payload() payload: UpdateProjectRequestDto) {
    const data = await this.projectsService.updateProject(payload.id, payload.data);
    return parseProjectResponse({ success: true, data });
  }

  @UsePipes(new ZodValidationPipe(DeleteProjectRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'projects.delete' })
  async deleteProject(@Payload() payload: DeleteProjectRequestDto): Promise<SuccessTrueResponseDto> {
    const data = await this.projectsService.deleteProject(payload.id);
    return parseSuccessTrueResponse({ success: true, data });
  }
}
