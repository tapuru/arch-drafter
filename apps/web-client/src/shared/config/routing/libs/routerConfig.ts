import {
  AuthRoutes,
  MainRoutes,
  ErrorsRoutes,
  ProfileRoutes,
} from "../routes";

export type TRouterNode = {
  path: string;
  element: React.ReactNode;
  children?: TRouterNode[];
};

export const routerConfig: TRouterNode[] = [
  ...AuthRoutes,
  ...ErrorsRoutes,
  ...MainRoutes,
  ...ProfileRoutes
];