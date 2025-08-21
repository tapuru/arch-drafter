export const WEB_ROUTES = {
  //main
  MAIN_HOME: '/',
  EXAMPLE: '/example',
  //auth
  AUTH: '/auth',
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  //profile
  PROFILE: '/profile',
  SETTINGS: '/profile/settings',
  USER_DATA: '/profile/user-data',
  ABOUT_APP: '/profile/about-app',
  //errors
  ERRORS: '/errors',
  FORBIDDEN: '/errors/forbidden',
  NOT_FOUND: '/errors/not-found',
  SERVER_ERROR: '/errors/server-error',
  UNKNOWN: '/errors/unknown',

} as const;