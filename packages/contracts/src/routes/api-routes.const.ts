export const API_ROUTES = {
  PROJECTS: '/projects',
  INVITES: {
    ROOT: '/invites',
    GET_PROJECT_INVITES: (projectId: string) => `/projects/${projectId}/invites`,
    GET_USER_INVITES: (userId: string) => `/users/${userId}/invites`,
    ACCEPT: '/invites/accept',
    REJECT: '/invites/reject',
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
