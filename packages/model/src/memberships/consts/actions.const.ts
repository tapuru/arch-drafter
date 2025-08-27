export const MEMBERSHIPS_ACTIONS = {
  CREATE_MEMBERHIP: 'memberships.create',
  LEAVE_PROJECT: 'memberships.leaveProject',
  REMOVE_FROM_PROJECT: 'memberships.removeFromProject',
} as const;

export type MembershipAction = (typeof MEMBERSHIPS_ACTIONS)[keyof typeof MEMBERSHIPS_ACTIONS];
