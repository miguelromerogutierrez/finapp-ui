import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Client from '../../api/api';
import { UserResponse } from '../../entities/entities';

interface AuthCtxModel {
  isAuth: boolean;
  getAuth: () => UserResponse | {};
  login: (email: string) => void;
}

interface AuthProviderProps {
  children: ReactNode
}

const lsKey = 'X-UID';

const AuthCtx = createContext<AuthCtxModel>({ isAuth: false, getAuth: () => ({}), login: () => { } });

const AuthProvider = (props: AuthProviderProps) => {
  const [auth, setAuth] = useState<UserResponse | null>(null);
  const history = useHistory();

  useEffect(() => {
    const xuid = window.localStorage.getItem(lsKey) ? Number(window.localStorage.getItem(lsKey)) : NaN;
    if (!isNaN(xuid)) {
      Client().getUser({ uid: xuid }, (error, response) => {
        if (error) { }
        else {
          window.localStorage.setItem(lsKey, `${response?.id || ""}`);
          setAuth(response);
          history.replace('/');
        }
      });
    }
  }, [])

  const login = (email: string) => Client().getUser({ email }, (error, response) => {
    if (error) { }
    else {
      window.localStorage.setItem(lsKey, `${response?.id || ""}`);
      setAuth(response);
      history.replace('/');
    }
  });

  const ctxValue = {
    isAuth: auth !== null,
    getAuth: () => (auth ? { ...auth } : {}),
    login
  };
  return <AuthCtx.Provider {...props} value={ctxValue} />
}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthCtx);
  return context;
}
