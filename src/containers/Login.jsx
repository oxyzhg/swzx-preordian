import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Form, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { login, updateToken } from '../actions/auth';
import LoginForm from '../components/LoginForm';

const { Content } = Layout;

class Login extends Component {
  componentDidMount() {
    let { isAuth, username, token } = this.props.auth;
    if (isAuth && token) {
      message.success(`欢迎你，${username}`);
      this.props.history.push('/');
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.postLoginForm(values);
      }
    });
  };
  postLoginForm = data => {
    if (!data) return;
    let baseUrl = this.props.baseUrl.test;
    let params = qs.stringify(data);

    axios
      .post(`${baseUrl}/preordain/login`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(res => {
        console.log(res);
        if (res.data.access_token) {
          this.getUserInfo(res.data.access_token);
        }
        // login(res.data.token)
        this.props.history.push('/');
        message.success('登录成功');
      })
      .catch(err => {
        console.log(err);
      });
  };
  getUserInfo = token => {
    if (!token) return;
    let baseUrl = this.props.baseUrl.test;
    let params = qs.stringify({ token });

    axios
      .get(`${baseUrl}/preordain/userinfo`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res);
        // login(res.data.token)
        this.props.history.push('/');
        message.success('登录成功');
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <Content className="page__bd">
        <LoginForm
          title="LOGIN"
          form={this.props.form}
          handleSubmit={this.handleSubmit}
        />
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
