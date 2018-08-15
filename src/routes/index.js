import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Admin from '../containers/Admin/Admin';
import AdminLogin from '../containers/Admin/Login';

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/login" component={AdminLogin} />
      </Switch>
    );
  }
}

export default Router;
