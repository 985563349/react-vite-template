import type { AuthState } from './state';

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
