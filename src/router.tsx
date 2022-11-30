import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { useInitialState } from './providers/InitialStateProvider';

import BasicLayout from './layouts/BasicLayout';
import PublicPage from './pages/PublicPage';
import ProtectedPage from './pages/ProtectedPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

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

function RequireAuth({ children }: { children: JSX.Element }) {
  const { initialState } = useInitialState();
  const location = useLocation();

  if (!initialState?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default router;
