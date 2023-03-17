import { useContext } from 'react';

import { AuthContext } from './context';
import type { AuthContextInterface } from './context';

export const useAuth = <TUser = any>(): AuthContextInterface<TUser> =>
  useContext(AuthContext);
