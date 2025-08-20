import { ProjectId } from '@/projects';
import { GetAllRes } from '@/shared';
import { UserId } from '@/users';

import { Invite, InviteId, InviteSchema } from './invite.schema';
import { Membership } from './memebership.schema';

export type GetUserInvites = (id: UserId) => Promise<GetAllRes<typeof InviteSchema>>;

export type GetProjectInvites = (id: ProjectId) => Promise<GetAllRes<typeof InviteSchema>>;

export type CreateMembership = (data: Omit<Membership, 'id' | 'joinedAt'>) => Promise<Membership>;

export type SendInvite = (data: Pick<Invite, 'userId' | 'senderId' | 'projectId' | 'role'>) => Promise<Invite>;

export type CancelInvite = (data: { id: InviteId; cancelerId: UserId }) => Promise<{ success: true }>;

export type AcceptInvite = (data: Pick<Invite, 'id' | 'userId'>) => Promise<Invite>;

export type RejectInvite = (data: Pick<Invite, 'id' | 'userId'>) => Promise<Invite>;

export type LeaveProject = (data: Pick<Membership, 'projectId' | 'userId'>) => Promise<{ success: boolean }>;

export type RemoveFromProject = (
  data: Pick<Membership, 'projectId' | 'userId'> & { removerId: UserId },
) => Promise<{ success: true }>;

export interface MembershipService {
  getUserInvites: GetUserInvites;
  getProjectInvites: GetProjectInvites;
  createMembership: CreateMembership;
  sendInvite: SendInvite;
  cancelInvite: CancelInvite;
  acceptInvite: AcceptInvite;
  rejectInvite: RejectInvite;
  leaveProject: LeaveProject;
  removeFromProject: RemoveFromProject;
}
