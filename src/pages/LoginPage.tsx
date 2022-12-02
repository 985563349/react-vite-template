import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthProvider';

type LoginFormDataType = {
  username: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: Location };
  const from = state?.from?.pathname || '/';

  const { isAuthenticated, login } = useAuth();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData) as LoginFormDataType;

    if (values.username === undefined || values.password === undefined) return;

    login(values, () => navigate(from, { replace: true }));
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
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
