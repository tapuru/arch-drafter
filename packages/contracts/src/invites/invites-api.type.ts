import { INVITES_ACTIONS } from '@bc-arch-drafter/model';

import { ApiSpec, ApiFromSpec } from '@/utils';

import { AcceptInviteRequestDto, RejectInviteRequestDto } from './dtos/accept-reject-invite.dto';
import { CancelInviteRequestDto } from './dtos/cancel-invite.dto';
import { GetProjectInvitesRequestDto, GetUserInvitesRequestDto } from './dtos/get-invites.dto';
import { ManyInvitesResponseDto, OneInviteResponseDto } from './dtos/invites-response.dto';
import { SendInviteRequestDto } from './dtos/send-invite.dto';

export type InvitesApiSpec = ApiSpec<
  typeof INVITES_ACTIONS,
  {
    [INVITES_ACTIONS.GET_USER_INVITES]: {
      request: GetUserInvitesRequestDto;
      response: ManyInvitesResponseDto;
    };
    [INVITES_ACTIONS.GET_PROJECT_INVITES]: {
      request: GetProjectInvitesRequestDto;
      response: ManyInvitesResponseDto;
    };
    [INVITES_ACTIONS.SEND]: { request: SendInviteRequestDto; response: OneInviteResponseDto };
    [INVITES_ACTIONS.CANCEL]: {
      request: CancelInviteRequestDto;
      response: { success: true };
    };
    [INVITES_ACTIONS.ACCEPT]: {
      request: AcceptInviteRequestDto;
      response: OneInviteResponseDto;
    };
    [INVITES_ACTIONS.REJECT]: {
      request: RejectInviteRequestDto;
      response: OneInviteResponseDto;
    };
  }
>;

export interface InvitesApi extends ApiFromSpec<InvitesApiSpec> {}
