import { createContext } from 'react';

import { initialAuthState } from './state';
import type { AuthState } from './state';

export interface AuthContextInterface<TUser = any> extends AuthState<TUser> {
  login: (data: any, callback?: VoidFunction) => Promise<void>;
  logout: (callback?: VoidFunction) => Promise<void>;
}

const stub = async () => {
  throw new Error('You forgot to wrap your component in <AuthProvider>.');
};

export const initialContext = {
  ...initialAuthState,
  login: stub,
  logout: stub,
};

export const AuthContext = createContext<AuthContextInterface>(initialContext);
