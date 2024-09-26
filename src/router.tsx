import { createBrowserRouter, useLocation, Navigate } from 'react-router-dom';

import { useAuth } from './providers/auth-provider';
import Layout from './layout';
import ErrorPage from './error-page';

import Login from './pages/login';
import Public from './pages/public';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Public />,
      },
      {
        path: '/protected',
        lazy: async () => {
          const { default: Protected } = await import('./pages/protected');

          return {
            element: (
              <ProtectedRoute>
                <Protected />
              </ProtectedRoute>
            ),
          };
        },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
