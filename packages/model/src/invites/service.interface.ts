import { ProjectId } from '@/projects';
import { GetAllRes } from '@/shared';
import { UserId } from '@/users';

import { Invite, InviteId, InviteSchema } from './invite.schema';

export type GetUserInvites = (id: UserId) => Promise<GetAllRes<typeof InviteSchema>>;

export type GetProjectInvites = (id: ProjectId) => Promise<GetAllRes<typeof InviteSchema>>;

export type SendInvite = (data: Pick<Invite, 'userId' | 'senderId' | 'projectId' | 'role'>) => Promise<Invite>;

export type CancelInvite = (data: { id: InviteId; cancelerId: UserId }) => Promise<{ success: true }>;

export type AcceptInvite = (data: Pick<Invite, 'id' | 'userId'>) => Promise<Invite>;

export type RejectInvite = (data: Pick<Invite, 'id' | 'userId'>) => Promise<Invite>;

export interface InvitesService {
  getUserInvites: GetUserInvites;
  getProjectInvites: GetProjectInvites;
  sendInvite: SendInvite;
  cancelInvite: CancelInvite;
  acceptInvite: AcceptInvite;
  rejectInvite: RejectInvite;
}
