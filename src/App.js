import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import Routes from './routes';
import ConfigureStore from './store';
import PageHeader from './layouts/PageHeader';
import PageFooter from './layouts/PageFooter';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Layout>
              <PageHeader title="大学生事务中心新生参观预约系统" />
              <Routes />
              <PageFooter year="2018" />
            </Layout>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
