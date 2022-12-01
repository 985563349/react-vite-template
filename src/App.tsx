import { RouterProvider } from 'react-router-dom';

import { useAuth } from './contexts/AuthProvider';

import router from './router';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
