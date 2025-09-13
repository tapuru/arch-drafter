import { Microservice } from '@bc-arch-drafter/api-config';
import {
  API_ROUTES,
  CreateMembershipRequestDto,
  CreateMembershipRequestSchema,
  LeaveProjectRequestDto,
  LeaveProjectRequestSchema,
  ManyMembershipResponseDto,
  OneMembershipResponseDto,
  RemoveFromProjectRequestDto,
  RemoveFromProjectRequestSchema,
  SuccessTrueResponseDto,
} from '@bc-arch-drafter/contracts';
import { AppHttpException, sendMessage, ZodValidationPipe } from '@bc-arch-drafter/lib';
import { isUseId, MEMBERSHIPS_ACTIONS, parseUserId } from '@bc-arch-drafter/model';
import { Body, Controller, Get, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class MembeshipsController {
  constructor(@Inject(Microservice.PROJECTS) private readonly client: ClientProxy) {}

  @Post(API_ROUTES.MEMBERHIPS.ROOT)
  async getProjectInvites(
    @Body(new ZodValidationPipe(CreateMembershipRequestSchema)) body: CreateMembershipRequestDto,
  ): Promise<OneMembershipResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: MEMBERSHIPS_ACTIONS.CREATE_MEMBERHIP },
      payload: body,
    });
    return res;
  }

  @Get(API_ROUTES.MEMBERHIPS.GET_USER_MEMBERSHIPS(':id'))
  async getUserMemberships(@Param('id') id: string): Promise<ManyMembershipResponseDto> {
    if (!isUseId(id)) {
      throw new AppHttpException('Invalid uuid', HttpStatus.BAD_REQUEST);
    }
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: MEMBERSHIPS_ACTIONS.GET_USER_MEMBERHIPS },
      payload: { userId: id },
    });
    return res;
  }

  @Patch(API_ROUTES.MEMBERHIPS.LEAVE_PROJECT)
  async leaveProject(
    @Body(new ZodValidationPipe(LeaveProjectRequestSchema)) body: LeaveProjectRequestDto,
  ): Promise<SuccessTrueResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: MEMBERSHIPS_ACTIONS.LEAVE_PROJECT },
      payload: body,
    });
    return res;
  }

  @Patch(API_ROUTES.MEMBERHIPS.REMOVE_FROM_PROJECT)
  async removeFromProject(
    @Body(new ZodValidationPipe(RemoveFromProjectRequestSchema)) body: RemoveFromProjectRequestDto,
  ): Promise<SuccessTrueResponseDto> {
    const res = await sendMessage({
      client: this.client,
      pattern: { cmd: MEMBERSHIPS_ACTIONS.REMOVE_FROM_PROJECT },
      payload: body,
    });
    return res;
  }
}
