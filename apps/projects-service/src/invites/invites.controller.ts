import {
  AcceptInviteRequestDto,
  AcceptInviteRequestSchema,
  CancelInviteRequestDto,
  CancelInviteRequestSchema,
  GetProjectInvitesRequestDto,
  GetProjectInvitesRequestSchema,
  GetUserInvitesRequestDto,
  GetUserInvitesRequestSchema,
  InvitesApi,
  parseManyInvitesResponse,
  parseOneIviteResponse,
  parseSuccessTrueResponse,
  RejectInviteRequestDto,
  RejectInviteRequestSchema,
  SendInviteRequestDto,
  SendInviteRequestSchema,
} from '@bc-arch-drafter/contracts';
import { ZodValidationPipe } from '@bc-arch-drafter/lib';
import { INVITES_ACTIONS } from '@bc-arch-drafter/model';
import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { InvitesServiceImpl } from './invites.service';

@Controller()
export class InvitesController implements InvitesApi {
  constructor(private readonly invitesService: InvitesServiceImpl) {}

  @UsePipes(new ZodValidationPipe(GetProjectInvitesRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: INVITES_ACTIONS.GET_PROJECT_INVITES })
  async getProjectInvites(@Payload() payload: GetProjectInvitesRequestDto) {
    const data = await this.invitesService.getProjectInvites(payload.id);
    return parseManyInvitesResponse({
      success: true,
      data,
    });
  }

  @UsePipes(new ZodValidationPipe(GetUserInvitesRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: INVITES_ACTIONS.GET_USER_INVITES })
  async getUserInvites(@Payload() payload: GetUserInvitesRequestDto) {
    const data = await this.invitesService.getUserInvites(payload.id);
    return parseManyInvitesResponse({
      success: true,
      data,
    });
  }

  @UsePipes(new ZodValidationPipe(SendInviteRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: INVITES_ACTIONS.SEND })
  async sendInvite(@Payload() payload: SendInviteRequestDto) {
    const data = await this.invitesService.sendInvite(payload);
    return parseOneIviteResponse({
      success: true,
      data,
    });
  }

  @UsePipes(new ZodValidationPipe(CancelInviteRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: INVITES_ACTIONS.CANCEL })
  async cancelInvite(@Payload() payload: CancelInviteRequestDto) {
    const data = await this.invitesService.cancelInvite(payload);
    return parseSuccessTrueResponse({
      success: true,
      data,
    });
  }

  @UsePipes(new ZodValidationPipe(AcceptInviteRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: INVITES_ACTIONS.ACCEPT })
  async acceptInvite(@Payload() payload: AcceptInviteRequestDto) {
    const data = await this.invitesService.acceptInvite(payload);
    return parseOneIviteResponse({
      success: true,
      data,
    });
  }

  @UsePipes(new ZodValidationPipe(RejectInviteRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: INVITES_ACTIONS.REJECT })
  async rejectInvite(@Payload() payload: RejectInviteRequestDto) {
    const data = await this.invitesService.rejectInvite(payload);
    return parseOneIviteResponse({
      success: true,
      data,
    });
  }
}
