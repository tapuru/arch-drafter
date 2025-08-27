import { Microservice } from '@bc-arch-drafter/api-config';
import {
  API_ROUTES,
  CreateMembershipRequestDto,
  CreateMembershipRequestSchema,
  LeaveProjectRequestDto,
  LeaveProjectRequestSchema,
  OneMembershipResponseDto,
  RemoveFromProjectRequestDto,
  RemoveFromProjectRequestSchema,
  SuccessTrueResponseDto,
} from '@bc-arch-drafter/contracts';
import { sendMessage, ZodValidationPipe } from '@bc-arch-drafter/lib';
import { MEMBERSHIPS_ACTIONS } from '@bc-arch-drafter/model';
import { Body, Controller, Inject, Patch, Post } from '@nestjs/common';
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
