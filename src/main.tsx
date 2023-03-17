import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from './providers/AuthProvider';
import App from './App';
import './index.css';

// start mock
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
