import { createBrowserRouter } from 'react-router-dom';

import BasicLayout from './layouts/BasicLayout';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import PublicPage from './pages/PublicPage';

import RequireAuth from './RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PublicPage />,
      },
      {
        path: 'protected',
        lazy: async () => {
          const { default: ProtectedPage } = await import('./pages/ProtectedPage');

          return {
            element: (
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            ),
          };
        },
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;
