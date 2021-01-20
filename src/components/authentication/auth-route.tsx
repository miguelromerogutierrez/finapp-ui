import React from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useAuth } from './auth-ctx';

const AuthRoute = (props: RouteProps) => {
  const history = useHistory();
  const auth = useAuth();

  if (!auth.isAuth) {
    history.replace('/login');
    return <p>Loading...</p>;
  }

  return <Route {...props} />;
}

export default AuthRoute;