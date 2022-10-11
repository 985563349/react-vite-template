import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { useInitialState } from './providers/InitialStateProvider';

import BasicLayout from './layouts/BasicLayout';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <BasicLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
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
