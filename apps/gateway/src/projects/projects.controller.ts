import { Microservice } from '@bc-arch-drafter/api-config';
import {
  API_ROUTES,
  CanvasResponseDto,
  CreateProjectRequestDto,
  CreateProjectRequestSchema,
  ProjectResponseDto,
  SuccessTrueResponseDto,
  UpdateProjectRequestDto,
  UpdateProjectRequestSchema,
} from '@bc-arch-drafter/contracts';
import { AppHttpException, sendMessage, ZodValidationPipe } from '@bc-arch-drafter/lib';
import { isProjectId, parseProjectId, PROJECTS_ACTIONS } from '@bc-arch-drafter/model';
import { CacheInterceptor, CacheTTL } from '@bc-arch-drafter/redis';
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ProjectsController {
  constructor(@Inject(Microservice.PROJECTS) private readonly client: ClientProxy) {}

  @Get(API_ROUTES.PROJECTS.LOAD_EXAMPLE())
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 60 * 24)
  async loadExample(): Promise<CanvasResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: PROJECTS_ACTIONS.LOAD_EXAMPLE },
      //TODO: assign a correct type
      payload: {} as any,
    });
    return res;
  }

  @Get(API_ROUTES.PROJECTS.GET_BY_ID(':id'))
  async getProjectById(@Param('id') id: string): Promise<ProjectResponseDto> {
    if (!isProjectId(id)) {
      throw new AppHttpException('Invalid uuid', HttpStatus.BAD_REQUEST);
    }
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: PROJECTS_ACTIONS.GET_BY_ID },
      payload: { id },
    });
    return res;
  }

  @Post(API_ROUTES.PROJECTS.ROOT)
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

  @Put(API_ROUTES.PROJECTS.UPDATE(':id'))
  async updateProject(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateProjectRequestSchema.shape.data)) data: UpdateProjectRequestDto['data'],
  ): Promise<ProjectResponseDto> {
    if (!isProjectId(id)) {
      throw new AppHttpException('Invalid uuid', HttpStatus.BAD_REQUEST);
    }
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: PROJECTS_ACTIONS.UPDATE },
      payload: { id: parseProjectId(id), data },
    });
    return res;
  }

  @Delete(API_ROUTES.PROJECTS.DELETE(':id'))
  async deleteProject(@Param('id') id: string): Promise<SuccessTrueResponseDto> {
    if (!isProjectId(id)) {
      throw new AppHttpException('Invalid uuid', HttpStatus.BAD_REQUEST);
    }
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: PROJECTS_ACTIONS.DELETE },
      payload: { id: parseProjectId(id) },
    });
    return res;
  }
}
