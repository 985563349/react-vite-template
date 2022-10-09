import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import InitialStateProvider, {
  useInitialState,
} from './providers/InitialStateProvider';

import BasicLayout from './layout/BasicLayout';
import Welcome from './pages/Welcome';
import About from './pages/About';
import SignIn from './pages/SignIn';
import NoFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <InitialStateProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <BasicLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Welcome />} />
            <Route path="about" element={<About />} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<NoFound />} />
        </Routes>
      </InitialStateProvider>
    </div>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { initialState } = useInitialState();
  const location = useLocation();

  if (!initialState?.token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
