import type { TRouterNode } from '../libs';

import { ProtectedRoute } from '../components';

export const ProfileRoutesFullPaths = {
  PROFILE: '/profile',
  SETTINGS: '/profile/settings',
  USER_DATA: '/profile/user-data',
  ABOUT_APP: '/profile/about-app',
};

//todo: добавить реальные компоненты, а не заглушки🐉🐉🐉
export const ProfileRoutes: TRouterNode[] = [
  {
    path: ProfileRoutesFullPaths.PROFILE,
    element: (
      <ProtectedRoute withAuth>
        <div>ProfilePage</div>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <div>ProfileMainPage</div>,
      },
      {
        path: 'user-data',
        element: <div>ProfileUserDataPage</div>,
      },
      {
        path: 'about-app',
        element: <div>AboutAppPage</div>,
      },
      {
        path: 'settings',
        element: <div>ProfileSettingsPage</div>,
      },
    ],
  },
];