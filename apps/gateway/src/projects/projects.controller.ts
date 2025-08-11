import { Microservice } from '@bc-arch-drafter/api-config';
import {
  API_ROUTES,
  CreateProjectRequestDto,
  CreateProjectRequestSchema,
  DeleteProjectResponseDto,
  ProjectResponseDto,
  UpdateProjectRequestDto,
  UpdateProjectRequestSchema,
} from '@bc-arch-drafter/contracts';
import { sendMessage, ZodValidationPipe } from '@bc-arch-drafter/lib';
import { parseProjectId } from '@bc-arch-drafter/model';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller(API_ROUTES.PROJECTS)
export class ProjectsController {
  constructor(@Inject(Microservice.PROJECTS) private readonly client: ClientProxy) {}

  @Get('/:id')
  async getProjectById(@Param('id') id: string): Promise<ProjectResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: 'projects.get-by-id' },
      payload: { id: parseProjectId(id) },
    });
    return res;
  }

  @Post()
  async createProject(
    @Body(new ZodValidationPipe(CreateProjectRequestSchema)) data: CreateProjectRequestDto,
  ): Promise<ProjectResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: 'projects.create' },
      payload: data,
    });
    return res;
  }

  @Put('/:id')
  async updateProject(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateProjectRequestSchema.shape.data)) data: UpdateProjectRequestDto['data'],
  ): Promise<ProjectResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: 'projects.update' },
      payload: { id: parseProjectId(id), data },
    });
    return res;
  }

  @Delete('/:id')
  async deleteProject(@Param('id') id: string): Promise<DeleteProjectResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: 'projects.delete' },
      payload: { id: parseProjectId(id) },
    });
    return res;
  }
}
