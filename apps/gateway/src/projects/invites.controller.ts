import { Microservice } from '@bc-arch-drafter/api-config';
import {
  AcceptInviteRequestDto,
  AcceptInviteRequestSchema,
  API_ROUTES,
  CancelInviteRequestDto,
  CancelInviteRequestSchema,
  ManyInvitesResponseDto,
  OneInviteResponseDto,
  RejectInviteRequestDto,
  RejectInviteRequestSchema,
  SendInviteRequestDto,
  SendInviteRequestSchema,
} from '@bc-arch-drafter/contracts';
import { sendMessage, ZodValidationPipe } from '@bc-arch-drafter/lib';
import { INVITES_ACTIONS, parseProjectId, parseUserId } from '@bc-arch-drafter/model';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class InvitesController {
  constructor(@Inject(Microservice.PROJECTS) private readonly client: ClientProxy) {}

  @Get(API_ROUTES.INVITES.GET_PROJECT_INVITES(':projectId'))
  async getProjectInvites(@Param('projectId') projectId: string): Promise<ManyInvitesResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: INVITES_ACTIONS.GET_PROJECT_INVITES },
      payload: { id: parseProjectId(projectId) },
    });
    return res;
  }

  @Get(API_ROUTES.INVITES.GET_USER_INVITES(':userId'))
  async getUserInvites(@Param('userId') userId: string): Promise<ManyInvitesResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: INVITES_ACTIONS.GET_USER_INVITES },
      payload: { id: parseUserId(userId) },
    });
    return res;
  }

  @Post(API_ROUTES.INVITES.ROOT)
  async sendInvite(
    @Body(new ZodValidationPipe(SendInviteRequestSchema)) body: SendInviteRequestDto,
  ): Promise<OneInviteResponseDto> {
    const res = await sendMessage({ client: this.client, pattern: { cmd: INVITES_ACTIONS.SEND }, payload: body });
    return res;
  }

  @Patch(API_ROUTES.INVITES.ACCEPT)
  async acceptInvite(
    @Body(new ZodValidationPipe(AcceptInviteRequestSchema)) body: AcceptInviteRequestDto,
  ): Promise<OneInviteResponseDto> {
    const res = await sendMessage({ client: this.client, pattern: { cmd: INVITES_ACTIONS.ACCEPT }, payload: body });
    return res;
  }

  @Patch(API_ROUTES.INVITES.REJECT)
  async rejectInvite(
    @Body(new ZodValidationPipe(RejectInviteRequestSchema)) body: RejectInviteRequestDto,
  ): Promise<OneInviteResponseDto> {
    const res = await sendMessage({ client: this.client, pattern: { cmd: INVITES_ACTIONS.REJECT }, payload: body });
    return res;
  }

  @Delete(API_ROUTES.INVITES.ROOT)
  async cancelInvite(
    @Body(new ZodValidationPipe(CancelInviteRequestSchema)) body: CancelInviteRequestDto,
  ): Promise<{ success: true }> {
    const res = await sendMessage({ client: this.client, pattern: { cmd: INVITES_ACTIONS.CANCEL }, payload: body });
    return res;
  }
}
