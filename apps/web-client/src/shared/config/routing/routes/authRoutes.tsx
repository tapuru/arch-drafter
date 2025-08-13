import type { TRouterNode } from '../libs';

export const AuthRoutesFullPaths = {
  AUTH: '/authentication',
  REGISTRATION: '/authentication/registration',
  AUTHORIZATION: '/authentication/authorization',
};

//todo: добавить реальные компоненты, а не заглушки🐉🐉🐉
export const AuthRoutes: TRouterNode[] = [
  {
    element: <div>Auth</div>,
    path: '/authentication',
    children: [
      {
        path: 'registration',
        element: <div>registration</div>,
      },
      {
        path: 'authorization',
        element: <div>authentication</div>,
      },
    ],
  },
];
