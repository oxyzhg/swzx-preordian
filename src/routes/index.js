import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin/Admin';
import AdminLogin from '@/pages/Admin/Login';

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
