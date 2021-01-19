import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/dashboard';
import Account from './components/account-detail';

import './App.css';

function App() {
  return <Router>
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/account/:id">
        <Account />
      </Route>
    </Switch>
  </Router>;
}

export default App;
