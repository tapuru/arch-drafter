export const API_ROUTES = {
  PROJECTS: {
    ROOT: '/projects',
    GET_BY_ID: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
  },
  INVITES: {
    ROOT: '/invites',
    GET_PROJECT_INVITES: (projectId: string) => `/projects/${projectId}/invites`,
    GET_USER_INVITES: (userId: string) => `/users/${userId}/invites`,
    ACCEPT: '/invites/accept',
    REJECT: '/invites/reject',
  },
  MEMBERHIPS: {
    ROOT: '/memberhips',
    LEAVE_PROJECT: '/projects/leave',
    REMOVE_FROM_PROJECT: '/projects/remove',
  },
  AUTH: {
    ROOT: '/auth',
    ME: '/me',
    REGISTER: '/register',
    LOGIN: '/login',
    PASSWORD_RECOVERY: '/recovery',
  },
  USERS: '/users',
} as const;
