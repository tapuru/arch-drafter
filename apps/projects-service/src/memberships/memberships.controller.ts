import {
  CreateMembershipRequestDto,
  CreateMembershipRequestSchema,
  GetUserMembershipsRequestDto,
  GetUserMembershipsRequestSchema,
  LeaveProjectRequestDto,
  LeaveProjectRequestSchema,
  MembershipsApi,
  parseManyMembershipResponse,
  parseOneMembershipResponse,
  parseSuccessTrueResponse,
  RemoveFromProjectRequestDto,
  RemoveFromProjectRequestSchema,
} from '@bc-arch-drafter/contracts';
import { ZodValidationPipe } from '@bc-arch-drafter/lib';
import { MEMBERSHIPS_ACTIONS } from '@bc-arch-drafter/model';
import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { MemberhipsServiceImpl } from './memberships.service';

@Controller()
export class MemberhipsController implements MembershipsApi {
  constructor(private readonly memberhipsService: MemberhipsServiceImpl) {}

  @UsePipes(new ZodValidationPipe(CreateMembershipRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: MEMBERSHIPS_ACTIONS.CREATE_MEMBERHIP })
  async create(@Payload() payload: CreateMembershipRequestDto) {
    const res = await this.memberhipsService.create(payload);
    return parseOneMembershipResponse({
      success: true,
      data: res,
    });
  }

  @UsePipes(new ZodValidationPipe(GetUserMembershipsRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: MEMBERSHIPS_ACTIONS.GET_USER_MEMBERHIPS })
  async getUserMemberships(@Payload() payload: GetUserMembershipsRequestDto) {
    const res = await this.memberhipsService.getUserMemberships(payload);
    return parseManyMembershipResponse({
      success: true,
      data: res,
    });
  }

  @UsePipes(new ZodValidationPipe(RemoveFromProjectRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: MEMBERSHIPS_ACTIONS.REMOVE_FROM_PROJECT })
  async removeFromProject(@Payload() payload: RemoveFromProjectRequestDto) {
    const res = await this.memberhipsService.removeFromProject(payload);
    return parseSuccessTrueResponse({
      success: true,
      data: res,
    });
  }

  @UsePipes(new ZodValidationPipe(LeaveProjectRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: MEMBERSHIPS_ACTIONS.LEAVE_PROJECT })
  async leaveProject(@Payload() payload: LeaveProjectRequestDto) {
    const res = await this.memberhipsService.leaveProject(payload);
    return parseSuccessTrueResponse({
      success: true,
      data: res,
    });
  }
}
