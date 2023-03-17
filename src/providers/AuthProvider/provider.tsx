import { useReducer, useEffect, useCallback, useMemo } from 'react';
import { flushSync } from 'react-dom';

import { AuthContext } from './context';
import { reducer } from './reducer';
import { initialAuthState } from './state';
import { hasAuth } from './utils';

import {
  login as loginRequest,
  logout as logoutRequest,
  fetchUserInfo,
} from '@/services';

import Loading from '@/components/Loading';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    (async () => {
      try {
        if (hasAuth() && state.isAuthenticated === false) {
          const user = await fetchUserInfo();
          dispatch({ type: 'INITIALISED', user });
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

  const login = useCallback(async (data: any, callback?: VoidFunction) => {
    const token = await loginRequest(data);
    localStorage.setItem('Token', token);
    const user = await fetchUserInfo();

    flushSync(() => {
      dispatch({ type: 'INITIALISED', user });
      callback?.();
    });
  }, []);

  const logout = useCallback(async (callback?: VoidFunction) => {
    await logoutRequest();
    localStorage.removeItem('Token');

    flushSync(() => {
      dispatch({ type: 'LOGOUT' });
      callback?.();
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {state.isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
