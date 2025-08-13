import type { TRouterNode } from '../libs';

import { BaseForm } from '@/pages/example';
import { HomePage } from '@/pages/home';

import { ProtectedRoute } from '../components';

export const MainRoutesFullPaths = {
  MAIN_HOME: '/',
  EXAMPLE: '/example',
};

//todo: добавить реальные компоненты, а не заглушки🐉🐉🐉
export const MainRoutes: TRouterNode[] = [
  {
    path: MainRoutesFullPaths.MAIN_HOME,
    element: (
      <ProtectedRoute withAuth>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: MainRoutesFullPaths.EXAMPLE,
    element: (
      <BaseForm />
    ),
  },
];
