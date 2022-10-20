import { Link, Outlet, useNavigate } from 'react-router-dom';

import { Storage } from '@/constants';
import { useInitialState } from '@/providers/InitialStateProvider';
import { signOut } from '@/services';

function Layout() {
  const { setInitialState } = useInitialState();
  const navigate = useNavigate();

  return (
    <div>
      <h1>layout</h1>
      <ul>
        <li>
          <Link to="/">welcome</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/404">404</Link>
        </li>
      </ul>

      <button
        onClick={async () => {
          await signOut();
          localStorage.removeItem(Storage.Token);
          setInitialState(null);
          navigate('/');
        }}
      >
        Sign out
      </button>

      <Outlet />
    </div>
  );
}

export default Layout;
