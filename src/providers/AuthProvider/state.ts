export interface AuthState<TUser = any> {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: TUser;
  error?: any;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};
