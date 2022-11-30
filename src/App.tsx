import { RouterProvider } from 'react-router-dom';

import router from './router';
import InitialStateProvider from './providers/InitialStateProvider';

function App() {
  return (
    <div id="app">
      <InitialStateProvider>
        <RouterProvider router={router} />
      </InitialStateProvider>
    </div>
  );
}

export default App;
