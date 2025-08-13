import type { TRouterNode } from '../libs';

import { Route } from 'react-router-dom';

export const renderRoutes = (routes: TRouterNode[]) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};
