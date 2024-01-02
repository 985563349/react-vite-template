import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/providers/AuthProvider';

type LoginFormData = {
  username: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { from?: Location };
  const from = state?.from?.pathname || '/';

  const { isAuthenticated, signIn } = useAuth();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData) as LoginFormData;

    if (values.username === undefined || values.password === undefined) return;

    signIn(values, () => navigate(from, { replace: true }));
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

export default LoginPage;
