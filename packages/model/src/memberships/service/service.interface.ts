import {
  AcceptInviteRequestDto,
  AcceptInviteResponseDto,
} from "../dtos/accept-invite.dto";
import {
  CancelInviteRequestDto,
  CancelInviteResponseDto,
} from "../dtos/cancel-invite.dto";
import {
  CreateMembershipRequestDto,
  CreateMembershipResponseDto,
} from "../dtos/create-membership.dto";
import {
  GetInvitesResponseDto,
  GetProjectInvitesRequestDto,
  GetUserInvitesRequestDto,
} from "../dtos/get-invites.dto";
import {
  KickFromProjectRequestDto,
  KickFromProjectResponseDto,
} from "../dtos/kick-from-project.dto";
import {
  LeaveProjectRequestDto,
  LeaveProjectResponseDto,
} from "../dtos/leave-project.dto";
import {
  RejectInviteRequestDto,
  RejectInviteResponseDto,
} from "../dtos/reject-invite.dto";
import {
  SendInviteRequestDto,
  SendInviteResponseDto,
} from "../dtos/send-invite.dto";

export type GetUserInvites = (
  data: GetUserInvitesRequestDto,
) => Promise<GetInvitesResponseDto>;

export type GetProjectInvites = (
  data: GetProjectInvitesRequestDto,
) => Promise<GetInvitesResponseDto>;

export type CreateMembership = (
  data: CreateMembershipRequestDto,
) => Promise<CreateMembershipResponseDto>;

export type SendInvite = (
  data: SendInviteRequestDto,
) => Promise<SendInviteResponseDto>;

export type CancelInvite = (
  data: CancelInviteRequestDto,
) => Promise<CancelInviteResponseDto>;

export type AcceptInvite = (
  data: AcceptInviteRequestDto,
) => Promise<AcceptInviteResponseDto>;

export type RejectInvite = (
  data: RejectInviteRequestDto,
) => Promise<RejectInviteResponseDto>;

export type LeaveProject = (
  data: LeaveProjectRequestDto,
) => Promise<LeaveProjectResponseDto>;

export type KickFromProject = (
  data: KickFromProjectRequestDto,
) => Promise<KickFromProjectResponseDto>;

export interface MembershipService {
  getUserInvites: GetUserInvites;
  getProjectInvites: GetProjectInvites;
  createMembership: CreateMembership;
  sendInvite: SendInvite;
  cancelInvite: CancelInvite;
  acceptInvite: AcceptInvite;
  rejectInvite: RejectInvite;
  leaveProject: LeaveProject;
  kickFromProject: KickFromProject;
}
