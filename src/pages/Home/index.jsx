import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, BackTop, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import SelectForm from '@/components/SelectForm';
import SelectTimeline from '@/components/SelectTimeline';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: null,
      selectedOptions: null,
      defaultOption:null,
      preordainAt: null
    };
  }
  componentDidMount() {
    let { token, expires_at } = sessionStorage;
    if (!token) {
      message.info('请登录');
      this.props.history.push('/login');
    } else if (expires_at && moment().isAfter(expires_at)) {
      message.error('登录过期，请重新登录');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('expires_at');
      sessionStorage.removeItem('username');
    } else {

    }
    this.getSelectedList();
    this.getPreordainAt();
  }
  /**
   * @description 处理时间段选择提交事件
   * @param {*} e
   * @param {*} form
   */
  handleSubmit = (e, form) => {
    e.preventDefault();
    const { data } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        if (this.state.defaultOption === values.preordain) {
          message.info('该时间段已经被选用');
          return;
        }
        const [date, time] = values.preordain;
        const current = data.filter(item => item.date === date && item.time === time)[0];
        const formData = { id: current.id };
        this.createSelectData(formData);
      }
    });
  };
  /**
   * @description 处理时间段删除事件
   * @param {*} date
   * @param {*} time
   * @returns
   */
  handleComfirm = (date, time) => {
    if (!date || !time) return;
    const current = this.state.data.filter(item => item.date === date && item.time === time)[0];
    this.deleteSelectData(current.id);
  };
  /**
   * @description 向服务器发送get请求，获取系统开放、关闭时间数据
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
   * @description 向服务器发送get请求，获取可以选择的列表，数据需要处理才能使用
   */
  getSelectedList = () => {
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/preordain/list`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const data = res.data.data;
          const username = sessionStorage.getItem('username');
          const selectedList = data.filter(item => item.college);
          // FIXME: 最后的数据可能需要排序
          const selectedOptions = data
            .map(item => item.date)
            .filter((ele, idx, arr) => arr.indexOf(ele) === idx)
            .map(item => ({
              value: item,
              label: item,
              children: data.filter(ele => ele.date === item).map(ele => ({
                value: ele.time,
                label: `${ele.time} ${ele.college ? ele.college : ''}`,
                disabled: ele.college ? true : false
              }))
            }));
          const defaultOption = data
            .filter(ele => ele.college === username)
            .sort((a, b) => b.id - a.id)
            .map(i => [i.date, i.time])[0];
          this.setState({
            data,
            selectedList,
            selectedOptions,
            defaultOption
          });
        }
      })
      .catch(err => {
        message.error(err.response.data.message);
      });
  };
  /**
   * @description 向服务器发送post请求，学院选择时间段
   * @param {*} data
   * @returns
   */
  createSelectData = data => {
    if (!data) return;
    const { token } = sessionStorage;
    const { baseUrl } = this.props;
    const params = qs.stringify(data);
    axios
      .post(`${baseUrl}/preordain/select`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          message.success('添加成功');
          this.getSelectedList();
        }
      })
      .catch(err => {
        message.error('添加失败');
      });
  };
  /**
   * @description 向服务器发送delete请求，删除学院已选择的时间段
   * @param {*} id
   * @returns
   */
  deleteSelectData = id => {
    if (!id) return;
    const { token } = sessionStorage;
    const { baseUrl } = this.props;

    axios
      .delete(`${baseUrl}/preordain/select/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        // TODO: 存储数据并舒心请求
        if (res.status >= 200 && res.status <= 300) {
          message.success('删除成功');
          this.getSelectedList();
        }
      })
      .catch(err => {
        message.error('删除失败');
      });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <SelectForm
          options={this.state.selectedOptions}
          defaultValue={this.state.defaultOption}
          handleSubmit={this.handleSubmit}
        />
        <Divider />
        <SelectTimeline
          preordainAt={this.state.preordainAt}
          selected={this.state.selectedList}
          handleComfirm={this.handleComfirm}
        />
        <BackTop />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Home);
