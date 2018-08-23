import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import NotMatch from '@/pages/404';
import Home from '@/pages/Home';
import HomeLogin from '@/pages/Login/HomeLogin';
import Admin from '@/pages/Admin';
import AdminLogin from '@/pages/Login/AdminLogin';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={HomeLogin} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route component={NotMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
