import { createBrowserRouter } from 'react-router-dom';

import Layout from './layout';
import ErrorPage from './error-page';
import Portfolio from './pages/portfolio'; // Import the Portfolio component

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Portfolio />, // Use Portfolio component for the root path
      },
    ],
  },
]);

export default router;
