import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Form, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { login, updateToken } from '../../actions/auth';
import LoginForm from '../../components/LoginForm';

const { Content } = Layout;

class Login extends Component {
  componentDidMount() {
    let { isAuth, username, token } = this.props.auth;
    if (isAuth && token) {
      message.success(`欢迎你，${username}`);
      this.props.history.push('/admin');
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  postLoginForm = data => {};
  getUserInfo = token => {};
  render() {
    return (
      <Content className="page__bd">
        <LoginForm title="ADMIN" form={this.props.form} handleSubmit={this.handleSubmit} />
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch),
  updateToken: bindActionCreators(updateToken, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
