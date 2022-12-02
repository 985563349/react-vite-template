import { RouterProvider } from 'react-router-dom';

import router from './router';
import { useAuth } from './contexts/AuthProvider';
import Loading from './components/Loading';

function App() {
  const { isReady } = useAuth();

  if (isReady === false) {
    return <Loading />;
  }

  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
