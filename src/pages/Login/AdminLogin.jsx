import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import LoginForm from '@/components/LoginForm';
import { updateOptionalList, updateAdminDefault } from '@/actions/admin';
import './style.scss';

class AdminLogin extends Component {
  componentDidMount() {
    const { username, token, expires_at } = sessionStorage;
    if (token && expires_at && moment().isBefore(expires_at)) {
      message.success(`欢迎你，${username}`);
      this.props.history.push('/admin');
    }
  }
  /**
   * @description 处理表单提交事件
   * @memberof Login
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
   * @description 向服务器发送post请求，登录并获取token
   * @param {*} data
   * @returns
   */
  postLoginForm = data => {
    if (!data) return;
    const { baseUrl } = this.props;
    const params = qs.stringify(data);
    axios
      .post(`${baseUrl}/preordain/adminlogin`, params)
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
   * @description 向服务器发送get请求，获取用户信息
   * @param {*} token 上一步登录时候获取的token
   * @returns
   */
  getUserInfo = token => {
    if (!token) return;
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/preordain/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          sessionStorage.removeItem('username');
          sessionStorage.setItem('username', res.data.data.name);
          message.success(`${res.data.data.name} 登录成功`);
          this.props.history.push('/admin');
        }
      })
      .catch(err => {
        console.error(err.response);
      });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <LoginForm title="ADMIN" handleSubmit={this.handleSubmit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

const mapDispatchToProps = dispatch => ({
  updateOptionalList: bindActionCreators(updateOptionalList, dispatch),
  updateAdminDefault: bindActionCreators(updateAdminDefault, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AdminLogin));
