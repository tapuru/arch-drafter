import { MEMBERSHIPS_ACTIONS } from '@bc-arch-drafter/model';

import { SuccessTrueResponseDto } from '@/responses';
import { ApiFromSpec, ApiSpec } from '@/utils';

import { CreateMembershipRequestDto } from './dtos/create-membership.dto';
import { GetUserMembershipsRequestDto } from './dtos/get-memberships.dto';
import { LeaveProjectRequestDto } from './dtos/leave-project.dto';
import { ManyMembershipResponseDto, OneMembershipResponseDto } from './dtos/memberships-response';
import { RemoveFromProjectRequestDto } from './dtos/remove-from-project.dto';

export type MembershipsApiSpec = ApiSpec<
  typeof MEMBERSHIPS_ACTIONS,
  {
    [MEMBERSHIPS_ACTIONS.CREATE_MEMBERHIP]: {
      request: CreateMembershipRequestDto;
      response: OneMembershipResponseDto;
    };
    [MEMBERSHIPS_ACTIONS.LEAVE_PROJECT]: {
      request: LeaveProjectRequestDto;
      response: SuccessTrueResponseDto;
    };
    [MEMBERSHIPS_ACTIONS.REMOVE_FROM_PROJECT]: {
      request: RemoveFromProjectRequestDto;
      response: SuccessTrueResponseDto;
    };
    [MEMBERSHIPS_ACTIONS.GET_USER_MEMBERHIPS]: {
      request: GetUserMembershipsRequestDto;
      response: ManyMembershipResponseDto;
    };
  }
>;

export interface MembershipsApi extends ApiFromSpec<MembershipsApiSpec> {}
