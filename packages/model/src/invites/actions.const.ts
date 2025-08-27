export const INVITES_ACTIONS = {
  GET_USER_INVITES: 'invites.getUserInvites',
  GET_PROJECT_INVITES: 'invites.getProjectInvites',
  SEND: 'invites.sendInvite',
  CANCEL: 'invites.cancelInvite',
  ACCEPT: 'invites.acceptInvite',
  REJECT: 'invites.rejectInvite',
} as const;

export type InvitesAction = (typeof INVITES_ACTIONS)[keyof typeof INVITES_ACTIONS];
