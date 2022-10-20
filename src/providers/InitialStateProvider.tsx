import { createContext, useState, useContext, useEffect } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { Storage } from '@/constants';
import { fetchUserInfo } from '@/services';

export type InitialStateType = {
  token?: string;
  user?: {
    username: string;
  };
} | null;

export type InitialStateContextType = {
  initialState: InitialStateType;
  setInitialState: Dispatch<SetStateAction<InitialStateType>>;
};

const InitialStateContext = createContext<InitialStateContextType>(null!);

export function useInitialState() {
  return useContext(InitialStateContext);
}

function InitialStateProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [initialState, setInitialState] = useState<InitialStateType>(null);

  useEffect(() => {
    const token = localStorage.getItem(Storage.Token);

    if (token) {
      fetchUserInfo().then((user) => {
        setInitialState((s) => ({ ...s, user, token }));
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    initialState,
    setInitialState,
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <InitialStateContext.Provider value={value}>
      {children}
    </InitialStateContext.Provider>
  );
}

export default InitialStateProvider;
