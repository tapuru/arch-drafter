import { Project } from '@/projects';
import { ServiceFromActions } from '@/shared';
import { UserId } from '@/users';

import { MEMBERSHIPS_ACTIONS } from './consts/actions.const';
import { Membership } from './schemas/memebership.schema';

export type CreateMembership = (data: Omit<Membership, 'id' | 'joinedAt'>) => Promise<Membership>;

export type LeaveProject = (data: Pick<Membership, 'projectId' | 'userId'>) => Promise<{ success: boolean }>;

export type RemoveFromProject = (
  data: Pick<Membership, 'projectId' | 'userId'> & { removerId: UserId },
) => Promise<{ success: true }>;

type GetUserMemberships = (data: { userId: UserId }) => Promise<{
  items: Array<Membership & { project: Project }>;
  totalCount: number;
}>;

export interface MembershipService
  extends ServiceFromActions<
    typeof MEMBERSHIPS_ACTIONS,
    {
      [MEMBERSHIPS_ACTIONS.CREATE_MEMBERHIP]: CreateMembership;
      [MEMBERSHIPS_ACTIONS.LEAVE_PROJECT]: LeaveProject;
      [MEMBERSHIPS_ACTIONS.REMOVE_FROM_PROJECT]: RemoveFromProject;
      [MEMBERSHIPS_ACTIONS.GET_USER_MEMBERHIPS]: GetUserMemberships;
    }
  > {}
