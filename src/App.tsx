import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/dashboard';
import Account from './components/account-detail';

import './App.css';
import AuthProvider from './components/authentication/auth-ctx';
import AuthRoute from './components/authentication/auth-route';
import Authentication from './components/authentication/authentication';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Authentication} />
          <AuthRoute path="/account/:id" component={Account} />
          <AuthRoute exact path="/" component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
