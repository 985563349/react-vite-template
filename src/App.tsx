import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
