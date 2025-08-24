import { ProjectId } from '@/projects';
import { GetAllRes, ServiceFromActions } from '@/shared';
import { UserId } from '@/users';

import { INVITES_ACTIONS } from './actions.const';
import { Invite, InviteId, InviteSchema } from './invite.schema';

export type GetUserInvites = (id: UserId) => Promise<GetAllRes<typeof InviteSchema>>;

export type GetProjectInvites = (id: ProjectId) => Promise<GetAllRes<typeof InviteSchema>>;

export type SendInvite = (data: Pick<Invite, 'userId' | 'senderId' | 'projectId' | 'role'>) => Promise<Invite>;

export type CancelInvite = (data: { id: InviteId; cancelerId: UserId }) => Promise<{ success: true }>;

export type AcceptInvite = (data: Pick<Invite, 'id' | 'userId'>) => Promise<Invite>;

export type RejectInvite = (data: Pick<Invite, 'id' | 'userId'>) => Promise<Invite>;

export interface InvitesService
  extends ServiceFromActions<
    typeof INVITES_ACTIONS,
    {
      [INVITES_ACTIONS.GET_USER_INVITES]: GetUserInvites;
      [INVITES_ACTIONS.GET_PROJECT_INVITES]: GetProjectInvites;
      [INVITES_ACTIONS.SEND]: SendInvite;
      [INVITES_ACTIONS.CANCEL]: CancelInvite;
      [INVITES_ACTIONS.ACCEPT]: AcceptInvite;
      [INVITES_ACTIONS.REJECT]: RejectInvite;
    }
  > {}
