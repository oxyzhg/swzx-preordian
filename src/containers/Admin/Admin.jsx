import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import NewOrdianForm from '../../components/Admin/NewOrdianForm';
import { Object } from 'core-js';

const { Content } = Layout;

class Admin extends Component {
  componentDidMount() {
    let { isAuth, token } = this.props.admin;
    if (!isAuth || !token) {
      message.info('请登录!');
      // this.props.history.push('/admin/login');
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
                    ? a.split('-')[0].split(':')[1] -
                      b.split('-')[0].split(':')[1]
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
  render() {
    return (
      <Content className="page__bd">
        <Row type="flex" justify="center">
          <Col xs={20} sm={16} md={12} lg={8}>
            <NewOrdianForm handleSubmit={this.handleSubmit} />
          </Col>
        </Row>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl,
  admin: state.admin,
  adminDefault: state.admin.admin_default
});

export default connect(mapStateToProps)(Admin);
