import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import InitialStateProvider from './providers/InitialStateProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InitialStateProvider>
      <RouterProvider router={router} />
    </InitialStateProvider>
  </React.StrictMode>
);
