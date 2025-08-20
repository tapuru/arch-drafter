import { RouterProvider } from 'react-router-dom';

import { createAppRouter } from '../routing';

export const AppRouterProvider = () => {

  const router = createAppRouter();
  return <RouterProvider router={router} />;
};