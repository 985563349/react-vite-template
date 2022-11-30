import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import InitialStateProvider from './providers/InitialStateProvider';
import './index.css';

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InitialStateProvider>
      <RouterProvider router={router} />
    </InitialStateProvider>
  </React.StrictMode>
);
