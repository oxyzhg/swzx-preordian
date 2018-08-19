import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import LoginForm from '@/components/LoginForm';
import './style.scss';

class HomeLogin extends Component {
  componentDidMount() {
    const { username, token, expires_at } = sessionStorage;
    if (token && expires_at && moment().isBefore(expires_at)) {
      message.success(`欢迎你，${username}`);
      this.props.history.push('/');
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        this.postLoginForm(values);
      }
    });
  };
  postLoginForm = data => {
    if (!data) return;
    const { baseUrl } = this.props;
    const params = qs.stringify(data);

    axios
      .post(`${baseUrl}/preordain/login`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const { access_token, expires_in } = res.data;
          const expires_at = moment().add(expires_in, 'second').format('YYYY-MM-DD HH:mm:ss');
          sessionStorage.setItem('token', access_token);
          sessionStorage.setItem('expires_at', expires_at);
          this.getUserInfo(res.data.access_token);
        }
      })
      .catch(err => {
        message.error('请检查用户名密码是否正确');
      });
  };
  getUserInfo = token => {
    if (!token) return;
    const { baseUrl } = this.props;

    axios
      .get(`${baseUrl}/preordain/userinfo`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          sessionStorage.removeItem('admin');
          sessionStorage.setItem('username', res.data.name);
          message.success(`${res.data.name} 登录成功`);
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <LoginForm form={this.props.form} handleSubmit={this.handleSubmit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(HomeLogin));
