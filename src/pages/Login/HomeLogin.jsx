import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import LoginForm from '@/components/LoginForm';
import Timeout from '@/components/Timeout';
import './style.scss';

class HomeLogin extends Component {
  state = {
    preordainAt: null
  };
  componentDidMount() {
    const { username, token, expires_at } = sessionStorage;
    if (token && expires_at && moment().isBefore(expires_at)) {
      message.success(`欢迎你，${username}`);
      this.props.history.push('/');
    }
    this.getPreordainAt();
  }
  /**
   * @description 处理登录事件
   * @param {*} e
   */
  handleSubmit = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.postLoginForm(values);
      }
    });
  };
  /**
   * @description 向服务器发送get请求，获取系统开放结束时间段
   */
  getPreordainAt = () => {
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/preordain/time`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const data = res.data.data;
          this.setState({ preordainAt: data });
        }
      })
      .catch(err => {
        message.error(err.response.data.message);
      });
  };
  /**
   * @description 向服务器发送post请求，登录并获取token
   * @param {*} data
   * @returns
   */
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
          const { access_token, expires_in } = res.data.data;
          const expires_at = moment()
            .add(expires_in, 'second')
            .format('YYYY-MM-DD HH:mm:ss');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('expires_at');
          sessionStorage.setItem('token', access_token);
          sessionStorage.setItem('expires_at', expires_at);
          this.getUserInfo(access_token);
        }
      })
      .catch(err => {
        message.error(err.response.data.message);
      });
  };
  /**
   * @description 向服务器发送get请求，获取用户数据
   * @param {*} token 登录时候获取的token
   * @returns
   */
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
          sessionStorage.removeItem('username');
          sessionStorage.setItem('username', res.data.data.name);
          message.success(`${res.data.data.name} 登录成功`);
          this.props.history.push('/');
        }
      })
      .catch(err => {
        message.error(err.response.data.message);
      });
  };
  render() {
    const { preordainAt } = this.state;
    return (
      <BasicLayout history={this.props.history}>
        {preordainAt &&
        moment().isAfter(preordainAt.open_at) &&
        moment().isBefore(preordainAt.close_at) ? (
          <LoginForm handleSubmit={this.handleSubmit} />
        ) : (
          <Timeout
            openAt={preordainAt && preordainAt.open_at}
            closeAt={preordainAt && preordainAt.close_at}
          />
        )}
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(HomeLogin));
