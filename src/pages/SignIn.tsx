import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useInitialState } from '@/providers/InitialStateProvider';
import { StorageKeys } from '@/constants';
import { fetchUserInfo, signIn } from '@/services';

type SignInFormDataType = {
  username: string;
  password: string;
};

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: Location };
  const from = state?.from?.pathname || '/';

  const { initialState, setInitialState } = useInitialState();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);

    if (values.username === undefined || values.password === undefined) return;

    const token = await signIn(values as SignInFormDataType);
    localStorage.setItem(StorageKeys.Token, token);
    const user = await fetchUserInfo();
    setInitialState?.((s) => ({ ...s, token, user }));

    navigate(from, { replace: true });
  };

  if (initialState?.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="sign-in">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-item">
          <input name="username" placeholder="username" />
        </div>

        <div className="form-item">
          <input name="password" type="password" placeholder="password" />
        </div>

        <div className="form-item">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;