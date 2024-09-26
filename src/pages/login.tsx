import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/providers/auth-provider';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, signIn } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    if (data.username && data.password) {
      signIn(data, () => navigate(from, { replace: true }));
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-item">
          <input name="username" placeholder="username" />
        </div>

        <div className="form-item">
          <input name="password" type="password" placeholder="password" />
        </div>

        <div className="form-item">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
