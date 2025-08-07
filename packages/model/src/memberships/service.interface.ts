import { ProjectId } from '@/projects';
import { UserId } from '@/users';

import { Invite } from './invite.schema';
import { Membership } from './memebership.schema';

export type GetUserInvites = (id: UserId) => Promise<Invite[]>;

export type GetProjectInvites = (id: ProjectId) => Promise<Invite[]>;

export type CreateMembership = (data: Omit<Membership, 'id' | 'joinedAt' | 'role'>) => Promise<Membership>;

export type SendInvite = (data: Pick<Invite, 'userId' | 'senderId' | 'projectId'>) => Promise<Invite>;

export type CancelInvite = (data: Pick<Invite, 'userId' | 'senderId' | 'projectId'>) => Promise<{ success: true }>;

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
