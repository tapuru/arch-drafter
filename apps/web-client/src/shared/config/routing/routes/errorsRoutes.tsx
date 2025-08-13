import type { TRouterNode } from '../libs';

import { Outlet, Navigate } from 'react-router-dom';

export const ErrorRoutesFullPaths = {
  UNKNOWN: '/errors/unknown',
  FORBIDDEN: '/errors/forbidden',
  NOT_FOUND: '/errors/not-found',
  SERVER_ERROR: '/errors/server-error',
};

//todo: добавить реальные компоненты, а не заглушки🐉🐉🐉
export const ErrorsRoutes: TRouterNode[] = [
  {
    path: 'errors',
    element: <Outlet />,
    children: [
      { element: <>NotFoundPage</>, path: ErrorRoutesFullPaths.FORBIDDEN },
      { element: <>ForbiddenPage</>, path: ErrorRoutesFullPaths.NOT_FOUND },
      { element: <>ServerErrorPage</>, path: ErrorRoutesFullPaths.SERVER_ERROR },
      { element: <>UnknownErrorPage</>, path: ErrorRoutesFullPaths.UNKNOWN },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to={ErrorRoutesFullPaths.NOT_FOUND} />,
  },
];