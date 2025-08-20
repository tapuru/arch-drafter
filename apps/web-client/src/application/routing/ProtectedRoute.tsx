import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedFrom?: string | string[];
  withAuth?: boolean;
}

export const ProtectedRoute = ({
                                 children,
                               }: ProtectedRouteProps) => {
  //todo: добавить логику

  return <>{children}</>;
};
