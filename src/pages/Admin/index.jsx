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
    let { admin, token } = sessionStorage;
    if (!admin || !token) {
      message.info('请登录后台');
      this.props.history.push('/admin/login');
    }
  }
  handleSubmit = (e, form) => {
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
        console.log(formData);
        this.createPreordainInfo(formData);
        message.success('提交成功~');
      }
    });
  };
  getDefaultOptions = id => {
    axios
      .get(`${this.props.baseUrl}/test`, {
        params: { id }
      })
      .then(res => {
        console.log(res);
        // 合理化、序列化接到的数据，然后更新到页面
      })
      .catch(err => {
        console.log(err);
      });
  };
  createPreordainInfo = data => {
    const { baseUrl, admin } = this.props;
    if (!admin.token) return;
    const params = qs.stringify(data);
    axios
      .post(`${baseUrl}/preordain/time`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(res => {
        if (res.data) {
          console.log(res);
        }
      })
      .catch(err => {
        message.error(err);
      });

    console.log(admin.token);
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
  baseUrl: state.baseUrl,
  adminData: state.adminData
});

export default connect(mapStateToProps)(Admin);
