import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { flushSync } from 'react-dom';

import Loading from '@/components/Loading';
import { login, logout, fetchUserInfo } from '@/services';

export interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: any;
  error?: any;
}

interface AuthProviderState extends AuthState {
  signIn: (data: any, callback?: VoidFunction) => Promise<void>;
  signOut: (callback?: VoidFunction) => Promise<void>;
}

export const AuthContext = createContext<AuthProviderState | null>(null);

type Action =
  | { type: 'INITIALIZED'; user: any }
  | { type: 'LOGOUT' }
  | { type: 'ERROR'; error: any }
  | { type: 'LOADING'; isLoading: boolean };

export const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'INITIALIZED':
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

    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
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

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem('Token') !== null) {
          const user = await fetchUserInfo();
          dispatch({ type: 'INITIALIZED', user });
        } else {
          dispatch({ type: 'LOADING', isLoading: false });
        }
      } catch (error) {
        dispatch({ type: 'ERROR', error });
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

  const signIn = useCallback(async (data: any, callback?: VoidFunction) => {
    const token = await login(data);
    localStorage.setItem('Token', token);
    const user = await fetchUserInfo();

    flushSync(() => {
      dispatch({ type: 'INITIALIZED', user });
      callback?.();
    });
  }, []);

  const signOut = useCallback(async (callback?: VoidFunction) => {
    await logout();
    localStorage.removeItem('Token');

    flushSync(() => {
      dispatch({ type: 'LOGOUT' });
      callback?.();
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      signIn,
      signOut,
    }),
    [state, signIn, signOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {state.isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
