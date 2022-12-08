import { createContext, useContext, useEffect, useReducer } from 'react';
import { flushSync } from 'react-dom';

import { request } from '@/utils/request';

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: any;
};

export type AuthContextInterface = AuthState & {
  login: (data: any, callback?: VoidFunction) => Promise<void>;
  logout: (callback?: VoidFunction) => Promise<void>;
};

type Action =
  | { type: 'INITIALISED'; user: any }
  | { type: 'LOGOUT' }
  | { type: 'LOADING'; isLoading: boolean };

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'INITIALISED':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: !!action.user,
        user: action.user,
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };

    case 'LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};

const hasAuth = () => localStorage.getItem('Token') !== null;

const AuthContext = createContext<AuthContextInterface>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    (async () => {
      try {
        if (hasAuth() && state.isAuthenticated === false) {
          const user = await request('/user');
          dispatch({ type: 'INITIALISED', user });
        }
      } finally {
        dispatch({ type: 'LOADING', isLoading: false });
      }
    })();
  }, []);

  // HACK: Logout outside the react context
  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data === 'AUTH:LOGOUT') {
        localStorage.removeItem('Token');
        dispatch({ type: 'LOGOUT' });
      }
    });
  }, []);

  const login = async (data: any, callback?: VoidFunction) => {
    const token = await request('/login', { method: 'POST', data });
    localStorage.setItem('Token', token);
    const user = await request('/user');

    flushSync(() => {
      dispatch({ type: 'INITIALISED', user });
      callback?.();
    });
  };

  const logout = async (callback?: VoidFunction) => {
    await request('/logout', { method: 'POST' });
    localStorage.removeItem('Token');

    flushSync(() => {
      dispatch({ type: 'LOGOUT' });
      callback?.();
    });
  };

  const contextValue = { ...state, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
