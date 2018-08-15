import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Form, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import LoginForm from '../../components/LoginForm';
import {
  adminLogin,
  updateAdminToken,
  updateOptionalList,
  updateAdminDefault
} from '../../actions/admin';

const { Content } = Layout;

class Login extends Component {
  componentDidMount() {
    let { isAuth, username, token, expiresAt } = this.props.admin;
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
        // this.postLoginForm(values);
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
        if (res.data.access_token) {
          const { access_token, expires_in } = res.data;
          const expires_at = moment().add(expires_in, 'second');
          this.props.updateAdminToken(access_token, expires_at);
          this.getUserInfo(res.data.access_token);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  getUserInfo = token => {
    if (!token) return;
    let baseUrl = this.props.baseUrl.test;

    axios
      .get(`${baseUrl}/preordain/userinfo`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.props.adminLogin(res.data.name);
          this.props.history.push('/admin');
          message.success('登录成功');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <Content className="page__bd">
        <LoginForm
          title="ADMIN"
          form={this.props.form}
          handleSubmit={this.handleSubmit}
        />
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl,
  admin: state.admin
});

const mapDispatchToProps = dispatch => ({
  adminLogin: bindActionCreators(adminLogin, dispatch),
  updateAdminToken: bindActionCreators(updateAdminToken, dispatch),
  updateOptionalList: bindActionCreators(updateOptionalList, dispatch),
  updateAdminDefault: bindActionCreators(updateAdminDefault, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
