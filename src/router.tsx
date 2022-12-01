import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';

import BasicLayout from './layouts/BasicLayout';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

const PublicPage = React.lazy(() => import('./pages/PublicPage'));
const ProtectedPage = React.lazy(() => import('./pages/ProtectedPage'));

import Loading from './components/Loading';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <PublicPage />
          </Suspense>
        ),
      },
      {
        path: 'protected',
        element: (
          <Suspense fallback={<Loading />}>
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
