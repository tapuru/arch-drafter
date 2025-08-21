import { createBrowserRouter } from 'react-router';
import { Navigate } from 'react-router-dom';

import { WEB_ROUTES } from '@bc-arch-drafter/contracts';

import { DefaultLayout } from '@/application/layouts';
import { ErrorPage } from '@/pages/error';
import { BaseForm } from '@/pages/example';
import { HomePage } from '@/pages/home';

import { ProtectedRoute } from './ProtectedRoute.tsx';


export const createAppRouter = () => {
  return createBrowserRouter([
    {
      element: <DefaultLayout />,
      children: [
        //main
        {
          path: WEB_ROUTES.MAIN_HOME,
          element: (
            <ProtectedRoute withAuth>
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: WEB_ROUTES.EXAMPLE,
          element: <BaseForm />,
        },
        //auth
        {
          path: WEB_ROUTES.REGISTER,
          element: <div>registration</div>,
        },
        {
          path: WEB_ROUTES.LOGIN,
          element: <div>login</div>,
        },
        //profile
        {
          path: WEB_ROUTES.PROFILE,
          element: <ProtectedRoute withAuth>
            <div>profile</div>
          </ProtectedRoute>,
        },
        {
          path: WEB_ROUTES.SETTINGS,
          element: <ProtectedRoute withAuth>
            <div>profile settings</div>
          </ProtectedRoute>,
        },
        {
          path: WEB_ROUTES.USER_DATA,
          element: <ProtectedRoute withAuth>
            <div>profile user-data</div>
          </ProtectedRoute>,
        },
        {
          path: WEB_ROUTES.ABOUT_APP,
          element: <ProtectedRoute withAuth>
            <div>profile about-app</div>
          </ProtectedRoute>,
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: WEB_ROUTES.ERRORS,
      children: [
        { path: WEB_ROUTES.FORBIDDEN, element: <>ForbiddenPage</> },
        { path: WEB_ROUTES.NOT_FOUND, element: <>NotFoundPage</> },
        { path: WEB_ROUTES.SERVER_ERROR, element: <>ServerErrorPage</> },
        { path: WEB_ROUTES.UNKNOWN, element: <>UnknownErrorPage</> },
      ],
    },
    {
      path: '*',
      element: <Navigate replace to={WEB_ROUTES.NOT_FOUND} />,
    },
  ]);
};