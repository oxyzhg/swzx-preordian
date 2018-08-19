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
    const { admin, token, expires_at } = sessionStorage;
    if (admin && token && expires_at && moment().isBefore(expires_at)) {
      message.success(`欢迎你，${admin}`);
      this.props.history.push('/admin');
    }
  }
  /**
   * @description 处理表单提交事件
   * @memberof Login
   */
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
  /**
   * @description 向服务器发送登录请求
   * @param {*} data
   * @returns
   */
  postLoginForm = data => {
    if (!data) return;
    const { baseUrl } = this.props;
    const params = qs.stringify(data);
    axios
      .post(`${baseUrl}/preordain/adminlogin`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(res => {
        if (res.data.access_token) {
          const { access_token, expires_in } = res.data;
          const expires_at = moment().add(expires_in, 'second');
          sessionStorage.setItem('token', access_token);
          sessionStorage.setItem('expires_at', expires_at);
          this.getUserInfo(res.data.access_token);
        }
      })
      .catch(err => {
        message.error('请检查用户名密码是否正确');
      });
  };
  /**
   * @description 根据上一步登录得到的token请求用户数据
   * @param {*} token
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
          sessionStorage.setItem('usernmae');
          sessionStorage.setItem('admin', res.data.name);
          message.success(`${res.data.name} 登录成功`);
          this.props.history.push('/admin');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <LoginForm title="ADMIN" form={this.props.form} handleSubmit={this.handleSubmit} />
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
