import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import BasicLayout from './layouts/BasicLayout';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

import RequireAuth from './RequireAuth';
import Loading from './components/Loading';

const PublicPage = React.lazy(() => import('./pages/PublicPage'));
const ProtectedPage = React.lazy(() => import('./pages/ProtectedPage'));

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
