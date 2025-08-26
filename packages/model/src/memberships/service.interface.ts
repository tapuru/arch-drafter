import { UserId } from '@/users';

import { Membership } from './schemas/memebership.schema';

export type CreateMembership = (data: Omit<Membership, 'id' | 'joinedAt'>) => Promise<Membership>;

export type LeaveProject = (data: Pick<Membership, 'projectId' | 'userId'>) => Promise<{ success: boolean }>;

export type RemoveFromProject = (
  data: Pick<Membership, 'projectId' | 'userId'> & { removerId: UserId },
) => Promise<{ success: true }>;

export interface MembershipService {
  createMembership: CreateMembership;
  leaveProject: LeaveProject;
  removeFromProject: RemoveFromProject;
}
