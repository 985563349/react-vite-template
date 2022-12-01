import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';

import BasicLayout from './layouts/BasicLayout';
import PublicPage from './pages/PublicPage';
import ProtectedPage from './pages/ProtectedPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

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
        element: <PublicPage />,
      },
      {
        path: 'protected',
        element: (
          <RequireAuth>
            <ProtectedPage />
          </RequireAuth>
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
