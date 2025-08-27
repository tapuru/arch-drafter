import { Microservice } from '@bc-arch-drafter/api-config';
import {
  API_ROUTES,
  CreateProjectRequestDto,
  CreateProjectRequestSchema,
  ProjectResponseDto,
  SuccessTrueResponseDto,
  UpdateProjectRequestDto,
  UpdateProjectRequestSchema,
} from '@bc-arch-drafter/contracts';
import { sendMessage, ZodValidationPipe } from '@bc-arch-drafter/lib';
import { parseProjectId, PROJECTS_ACTIONS } from '@bc-arch-drafter/model';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller(API_ROUTES.PROJECTS)
export class ProjectsController {
  constructor(@Inject(Microservice.PROJECTS) private readonly client: ClientProxy) {}

  @Get('/:id')
  async getProjectById(@Param('id') id: string): Promise<ProjectResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: PROJECTS_ACTIONS.GET_BY_ID },
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
      pattern: { cmd: PROJECTS_ACTIONS.CREATE },
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
      pattern: { cmd: PROJECTS_ACTIONS.UPDATE },
      payload: { id: parseProjectId(id), data },
    });
    return res;
  }

  @Delete('/:id')
  async deleteProject(@Param('id') id: string): Promise<SuccessTrueResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: PROJECTS_ACTIONS.DELETE },
      payload: { id: parseProjectId(id) },
    });
    return res;
  }
}
