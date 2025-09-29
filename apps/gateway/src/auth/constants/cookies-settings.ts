import { API_ROUTES } from '@bc-arch-drafter/contracts';

export const COOKIES_SETTINGS = {
  refreshToken: {
    name: 'refreshToken',
    httpOnly: true,
    secure: false,
    path: '/api' + API_ROUTES.AUTH.ROOT + API_ROUTES.AUTH.UPDATE_TOKEN,
    sameSite: 'lax',
  },
} as const;
