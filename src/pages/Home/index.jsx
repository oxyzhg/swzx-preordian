import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Divider, BackTop, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import BasicLayout from '@/layouts/BasicLayout';
import SelectForm from '@/components/SelectForm';
import SelectTimeline from '@/components/SelectTimeline';
import { updateSelectedList, updateOptionalList } from '@/actions/select';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          value: '21日下午',
          label: '21日下午',
          children: [
            {
              value: '14:00-14:20',
              label: '14:00-14:20'
            },
            {
              value: '14:20-14:40',
              label: '14:20-14:40'
            },
            {
              value: '14:40-15:00',
              label: '14:40-15:00'
            }
          ]
        },
        {
          value: '22日上午',
          label: '22日上午',
          children: [
            {
              value: '08:00-08:20',
              label: '08:00-08:20'
            },
            {
              value: '08:20-08:40',
              label: '08:20-08:40'
            },
            {
              value: '08:40-09:00',
              label: '08:40-09:00'
            }
          ]
        },
        {
          value: '22日下午',
          label: '22日下午',
          children: [
            {
              value: '14:00-14:20',
              label: '14:00-14:20'
            },
            {
              value: '14:20-14:40',
              label: '14:20-14:40'
            },
            {
              value: '14:40-15:00',
              label: '14:40-15:00'
            }
          ]
        }
      ],
      selectedList: [
        {
          id: 1,
          collegeName: '机械工程学院',
          selectDate: '2018-08-08',
          selectTime: '14:00-14:20'
        },
        {
          id: 2,
          collegeName: '机械工程学院',
          selectDate: '2018-08-08',
          selectTime: '14:00-14:20'
        },
        {
          id: 3,
          collegeName: '机械工程学院',
          selectDate: '2018-08-08',
          selectTime: '14:00-14:20'
        },
        {
          id: 4,
          collegeName: '机械工程学院',
          selectDate: '2018-08-08',
          selectTime: '14:00-14:20'
        },
        {
          id: 5,
          collegeName: '机械工程学院',
          selectDate: '2018-08-08',
          selectTime: '14:00-14:20'
        },
        {
          id: 6,
          collegeName: '机械工程学院',
          selectDate: '2018-08-08',
          selectTime: '14:00-14:20'
        }
      ]
    };
  }
  componentDidMount() {
    let { token, expires_at } = sessionStorage;
    if (!token) {
      message.info('请登录');
      this.props.history.push('/login');
    } else if (expires_at && moment().isAfter(expires_at)) {
      console.log('expires');
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  postSelectForm = data => {
    if (!data) return;
    let { baseUrl, updateSelectedList, updateOptionalList } = this.props;
    axios
      .post(`${baseUrl}/swzx/`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data
      })
      .then(res => {
        console.log(res);
        // updateSelectedList();
        // updateOptionalList();
      })
      .catch(err => {
        console.log(err);
      });
  };
  updateSelectedList = data => {};
  updateOptionalList = data => {};
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <SelectForm
          form={this.props.form}
          options={this.state.options}
          handleSubmit={this.handleSubmit}
        />
        <Divider />
        <SelectTimeline
          selected={this.state.selectedList}
          startAt={'2018-09-21 14:00'}
          endAt={'2018-09-27 14:00'}
        />
        <BackTop />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl,
  selected: state.selected
});

const mapDispatchToProps = dispatch => ({
  updateSelectedList: bindActionCreators(updateSelectedList, dispatch),
  updateOptionalList: bindActionCreators(updateOptionalList, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Home));
