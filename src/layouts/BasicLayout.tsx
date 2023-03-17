import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '@/providers/AuthProvider';

function BasicLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <h1>layout</h1>
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to="/404">404</Link>
        </li>
      </ul>

      {isAuthenticated ? (
        <button onClick={() => logout(() => navigate('/login'))}>
          Sign out
        </button>
      ) : null}

      <Outlet />
    </div>
  );
}

export default BasicLayout;
