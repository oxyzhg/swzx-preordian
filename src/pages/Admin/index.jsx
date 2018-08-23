import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import BasicLayout from '@/layouts/BasicLayout';
import NewOrdianForm from '@/components/NewOrdianForm';

class Admin extends Component {
  componentDidMount() {
    let { token, expires_at } = sessionStorage;
    if (!token) {
      message.info('请登录后台');
      this.props.history.push('/admin/login');
    } else if (expires_at && moment().isAfter(expires_at)) {
      message.error('登录过期，请重新登录');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('expires_at');
      sessionStorage.removeItem('username');
    }
  }
  /**
   * @description 表单提交事件
   * @param {*} e
   * @param {*} form
   * @param {*} type 提交类型,new新建,upgrade更新
   */
  handleSubmit = (e, form, type) => {
    e.preventDefault();
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        let options = Object.keys(values)
          .filter(key => key.length === 10 && key.split('-').length === 3)
          .map(key => ({
            value: key,
            label: moment(key).format('MM月DD日'),
            children: values[key]
              .sort(
                (a, b) =>
                  a.split(':')[0] === b.split(':')[0]
                    ? a.split('-')[0].split(':')[1] - b.split('-')[0].split(':')[1]
                    : a.split(':')[0] - b.split(':')[0]
              )
              .map(i => ({
                value: i,
                label: i
              }))
          }));
        let formData = {
          open_at: moment(values.open_at).format('YYYY-MM-DD HH:mm:00'),
          close_at: moment(values.close_at).format('YYYY-MM-DD HH:mm:00'),
          start_at: moment(values.start_at).format('YYYY-MM-DD HH:mm:00'),
          end_at: moment(values.end_at).format('YYYY-MM-DD HH:mm:00'),
          options
        };
        switch (type) {
          case 'new':
            this.createPreordainInfo(formData);
            break;
          case 'upgrade':
            this.upgradePreordainInfo(formData);
            break;
          default:
            return;
        }
      }
    });
  };
  /**
   * @description 向服务器发送post请求，创建新的预约数据
   * @param {*} data
   * @returns
   */
  createPreordainInfo = data => {
    if (!data) return;
    const { baseUrl } = this.props;
    const { token } = sessionStorage;
    const params = qs.stringify(data);
    axios
      .post(`${baseUrl}/preordain/time`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          console.log(res);
          message.success('创建成功，请刷新页面');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  /**
   * @description 向服务器发送put请求，更新系统开放时间和结束时间
   * @param {*} data
   * @returns
   */
  upgradePreordainInfo = data => {
    if (!data) return;
    const { baseUrl } = this.props;
    const { token } = sessionStorage;
    const params = qs.stringify(data);
    axios
      .put(`${baseUrl}/preordain/time`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          message.success('更新成功，请刷新页面');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <Row type="flex" justify="center">
          <Col xs={20} sm={16} md={12} lg={8}>
            <NewOrdianForm handleSubmit={this.handleSubmit} />
          </Col>
        </Row>
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Admin);
